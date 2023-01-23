import { PlusIcon } from '@heroicons/react/24/outline';

import { bills } from '~/services/mocks';
import BillDetail from './../billDetail/index';

type BillsProps = {
    showBillHandle: () => void;
};

export default function Bills({ showBillHandle }: BillsProps) {
    return (
        <div className="mt-4 px-20 grid grid-cols-4 gap-4 w-full h-5/6 overflow-y-auto">
            <div
                onClick={showBillHandle}
                className="flex items-center justify-center rounded-md border-white border-2 border-solid cursor-pointer"
            >
                <PlusIcon className="w-20 h-20" />
            </div>
            {bills.map((bill) => (
                <BillDetail key={bill.id} {...bill} />
            ))}
        </div>
    );
}
