import React, { Fragment, useState } from 'react';
import { TrashIcon, PlusIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

import { IProduct } from '~/interfaces';
import { Button } from '~/components';
import { getUId } from '~/utils';
import { Listbox, Transition } from '@headlessui/react';

type NewBillFormProps = {
    showBillHandle: () => void;
};

export default function NewBillForm({ showBillHandle }: NewBillFormProps) {
    const [generals, setGenerals] = useState<Array<IProduct>>([]);
    const [specifics, setSpecifics] = useState<Array<IProduct>>([]);

    const addNewGeneral = () => {
        const id = getUId();
        setGenerals([{ id, name: '', price: 0 }, ...generals]);
    };

    const addNewSpecific = () => {
        const id = getUId();
        setSpecifics([{ id, name: '', price: 0 }, ...specifics]);
    };

    const saveHandle = () => {
        console.log('save');
    };

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 tablet:py-10 tablet:px-20 desktop:py-20 desktop:px-60 text-primary z-10">
            <div className="relative bg-white w-full h-full rounded-lg shadow-md py-4 px-6 tablet:p-10 overflow-y-auto">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl">NEW BILL</h1>
                    <div className="hidden tablet:flex items-center">
                        <Button text="Cancel" outline status="ACTIVE" className="mr-4" onClick={showBillHandle} />
                        <Button text="Save" outline={false} status="ACTIVE" className="" onClick={saveHandle} />
                    </div>
                </div>

                <p>16/11/2023</p>

                <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-4 tablet:gap-8 w-full ">
                    <div>
                        <div className="flex justify-between">
                            <p className="font-bold">Generals</p>
                            <PlusIcon className="h-5 w-5 mr-1 cursor-pointer" onClick={addNewGeneral} />
                        </div>
                        {generals.map((item) => (
                            <ProductItem key={item.id} name={item.name} price={item.price} />
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <p className="font-bold">Specifics</p>
                            <PlusIcon className="h-5 w-5 mr-1 cursor-pointer" onClick={addNewSpecific} />
                        </div>

                        {specifics.map((item) => (
                            <ProductItem key={item.id} name={item.name} price={item.price} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center fixed bottom-4 left-4 right-4 tablet:hidden">
                    <Button text="Cancel" outline status="ACTIVE" className="mr-2 w-full" onClick={showBillHandle} />
                    <Button text="Save" outline={false} status="ACTIVE" className="ml-2 w-full" onClick={saveHandle} />
                </div>
            </div>
        </div>
    );
}

type ProductItemProps = {
    name: string;
    price: number;
};

function ProductItem({ name, price }: ProductItemProps) {
    const users = [
        {
            id: 1,
            name: 'Thuc',
            picture: '',
        },
        {
            id: 2,
            name: 'Thuc22',
            picture: '',
        },
        {
            id: 3,
            name: 'Thuc Tran',
            picture: '',
        },
    ];
    const [selected, setSelected] = useState(users[0]);
    return (
        <div className="mt-4 shadow-sm ">
            <div className="flex items-center">
                <input type="text" placeholder="Product..." className="mt-1 mr-1 px-4 py-2 block w-2/3 rounded-md " />

                <input
                    type="number"
                    min={0}
                    step={5000}
                    placeholder="Price..."
                    className="mt-1 px-4 py-2 block w-1/3 rounded-md "
                />

                <TrashIcon className="h-5 w-5 m-1" />
            </div>

            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative flex w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="flex truncate font-bold">
                            <img src={''} className="h-6 w-6 rounded-full mr-2" />
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
                            {users.map((workspace, workspaceIdx) => (
                                <Listbox.Option
                                    key={workspaceIdx}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4  ${
                                            active ? 'text-white font-bold' : 'text-gray-900'
                                        }`
                                    }
                                    value={workspace}
                                >
                                    {({ selected }) => (
                                        <span className={`flex truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                                            <img src={''} className="h-6 w-6 rounded-full mr-2" />
                                            <p>{workspace.name}</p>
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
