import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { TrashIcon, PlusIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

import { IProduct, IBill, IUser } from '~/interfaces';
import { Button, useConfirmAlert } from '~/components';
import { Listbox, Transition } from '@headlessui/react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { getCollaborators } from '~/services/apis/user';
import { useStore } from '~/store/hooks';
import { billsLoader, deleteBill } from '~/services/apis/bill';
import { createProduct, deleteProduct, updateProduct } from '~/services/apis/product';
import { useDebounce } from '~/hooks';

export default function BillForm() {
    const { bill } = useLoaderData() as { bill: IBill };
    const { workspaceId } = useParams();
    const { getUser, setBills } = useStore();
    const navigate = useNavigate();
    const { showConfirmAlert, ConfirmAlert } = useConfirmAlert();

    const [collaborators, setCollaborators] = useState<Array<IUser>>([]);
    const [generals, setGenerals] = useState<Array<IProduct>>(bill.generals);
    const [specifics, setSpecifics] = useState<Array<IProduct>>(bill.specifics);

    const addNewGeneral = async () => {
        const { _id } = getUser();
        const { addProduct } = await createProduct(_id, bill._id, '', 0, 'GENERAL');
        if (addProduct) {
            setGenerals([addProduct, ...generals]);
        }
    };

    const addNewSpecific = async () => {
        const { _id } = getUser();
        const { addProduct } = await createProduct(_id, bill._id, '', 0, 'SPECIFIC');
        if (addProduct) {
            setSpecifics([addProduct, ...specifics]);
        }
    };

    const handleDeleteBill = async () => {
        const resolve = async () => {
            const data = await deleteBill(bill._id);

            if (data) {
                handleTurnBack();
            }
        };

        const reject = () => {};

        showConfirmAlert({
            message: 'Are you sure you want to delete this bill?',
            reject,
            resolve,
        });
    };

    const handleDeleteProduct = async (productId: string) => {
        const data = await deleteProduct(productId);
        if (data) {
            setGenerals(generals.filter((e) => e._id !== productId));
            setSpecifics(specifics.filter((e) => e._id !== productId));
        }
    };

    const handleTurnBack = async () => {
        if (workspaceId) {
            const { bills } = await billsLoader(workspaceId);
            setBills(bills);
            navigate(`/workspace/${workspaceId}`);
        }
    };

    useEffect(() => {
        const fetchCollaborators = async () => {
            const { collaborators } = await getCollaborators(workspaceId || '');
            const user = getUser();
            setCollaborators([user, ...collaborators]);
        };

        fetchCollaborators();
    }, []);

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 tablet:py-10 tablet:px-20 desktop:py-20 desktop:px-60 text-primary z-10">
            <ConfirmAlert />
            <div className="relative bg-white w-full h-full rounded-lg shadow-md py-4 px-6 tablet:p-10 overflow-y-auto">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="flex">
                            <img src={bill.buyer.picture || ''} className="h-6 w-6 rounded-full mr-2" />
                            <p>{bill.buyer.name}</p>
                        </div>
                        <p> {moment(bill.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>

                    <div className="hidden tablet:flex items-center">
                        <Button text="Remove" outline className="mr-4 " onClick={handleDeleteBill} />
                        <Button text="Close" className="mr-4" onClick={handleTurnBack} />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-8 w-full ">
                    <div>
                        <div className="flex justify-between">
                            <p className="font-bold">Generals</p>
                            <PlusIcon className="h-5 w-5 mr-1 cursor-pointer" onClick={addNewGeneral} />
                        </div>
                        {generals.map((product) => (
                            <ProductItem
                                key={product._id}
                                productProps={product}
                                collaborators={collaborators}
                                handleDeleteProduct={handleDeleteProduct}
                            />
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <p className="font-bold">Specifics</p>
                            <PlusIcon className="h-5 w-5 mr-1 cursor-pointer" onClick={addNewSpecific} />
                        </div>

                        {specifics.map((product) => (
                            <ProductItem
                                key={product._id}
                                productProps={product}
                                collaborators={collaborators}
                                handleDeleteProduct={handleDeleteProduct}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center fixed bottom-4 left-4 right-4 tablet:hidden">
                    <Button text="Remove" outline className="mr-2 w-full" onClick={handleDeleteBill} />
                    <Button text="Close" className="mr-2 w-full" onClick={handleTurnBack} />
                </div>
            </div>
        </div>
    );
}

type ProductItemProps = {
    productProps: IProduct;
    collaborators: Array<IUser>;
    handleDeleteProduct: (productId: string) => void;
};

function ProductItem({ productProps, collaborators, handleDeleteProduct }: ProductItemProps) {
    const [product, setProduct] = useState(productProps);
    const [selected, setSelected] = useState(productProps.buyer);

    const productDebounce = useDebounce(product, 1000);

    useEffect(() => {
        updateProduct(product.buyer._id, product._id, product.name, product.price);
    }, [productDebounce]);

    const nameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, name: e.target.value });
    };

    const priceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({ ...product, price: +e.target.value });
    };

    return (
        <div className="mt-4 shadow-sm ">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Product..."
                    className="mt-1 mr-1 px-4 py-2 block w-2/3 rounded-md"
                    value={product.name}
                    onChange={nameChange}
                />

                <input
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="Price..."
                    className="mt-1 px-4 py-2 block w-1/3 rounded-md"
                    value={product.price}
                    onChange={priceChange}
                />

                <TrashIcon className="h-5 w-5 m-1" onClick={() => handleDeleteProduct(productProps._id)} />
            </div>

            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative flex w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="flex truncate font-bold">
                            <img src={selected.picture || ''} className="h-6 w-6 rounded-full mr-2" />
                            <p>{selected.name}</p>
                        </span>
                    </Listbox.Button>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-primary cursor-pointer" aria-hidden="true" />
                    </span>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-unselected py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {collaborators.map((user) => (
                                <Listbox.Option
                                    key={user._id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4  ${
                                            active ? 'text-white font-bold' : 'text-gray-900'
                                        }`
                                    }
                                    value={user}
                                >
                                    {({ selected }) => (
                                        <span className={`flex truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                            <img src={''} className="h-6 w-6 rounded-full mr-2" />
                                            <p>{user.name}</p>
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
