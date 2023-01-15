import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import { bills } from '~/mocks';
import BillDetail from './../billDetail/index';

export default function Bills() {
    return (
        <div className="mt-10 px-20 grid grid-cols-4 gap-4 w-full h-5/6 overflow-y-scroll">
            <NewSection />

            {bills.map((bill) => (
                <BillDetail key={bill.id} {...bill} />
            ))}
        </div>
    );
}

function NewSection() {
    return (
        <div className="flex items-center justify-center rounded-md border-white border-2 border-solid cursor-pointer">
            <PlusIcon className="w-20 h-20" />
        </div>
    );
}
