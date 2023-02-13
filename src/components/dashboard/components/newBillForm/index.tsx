import React, { useState } from 'react';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

import { IProduct } from '~/interfaces';
import { Button } from '~/components';
import { getUId } from '~/utils';

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
        <div className="absolute top-0 bottom-0 left-0 right-0 py-20 px-60 text-primary ">
            <div className="relative bg-white w-full h-full rounded-lg shadow-md p-10 overflow-y-auto">
                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl">NEW BILL</h1>
                    <div className="flex items-center">
                        <Button text="Cancel" outline status="LOADING" className="mr-4" onClick={showBillHandle} />
                        <Button text="Save" outline={false} status="DISABLE" className="" onClick={saveHandle} />
                    </div>
                </div>

                <p>16/11/2023</p>

                <div className="mt-4 grid grid-cols-2 gap-8 w-full ">
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
            </div>
        </div>
    );
}

type ProductItemProps = {
    name: string;
    price: number;
};

function ProductItem({ name, price }: ProductItemProps) {
    return (
        <div className="flex mt-4 items-center shadow-sm ">
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
    );
}
