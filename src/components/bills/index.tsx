import { BillDetail } from '~/components';
import { useStore } from '~/store/hooks';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { IBill } from '~/interfaces';
import { createBill, billsLoader } from '~/services/apis/bill';
import { useEffect } from 'react';

import { PlusIcon } from '@heroicons/react/24/outline';

export default function Bills() {
    const navigate = useNavigate();
    const { workspaceId } = useParams();

    const { getUser, getBills, setBills } = useStore();
    const bills = getBills();

    const handleCreateBill = async () => {
        const { _id } = getUser();
        if (_id && workspaceId) {
            const data = await createBill(_id, workspaceId);
            navigate(`bill/${data.addBill._id}`);
        }
    };

    useEffect(() => {
        const fetchBills = async () => {
            if (workspaceId) {
                const { bills } = await billsLoader(workspaceId);
                setBills(bills);
            }
        };
        fetchBills();
    }, [workspaceId]);

    return (
        <div className="mt-4 px-20 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4 w-full h-5/6 overflow-y-auto">
            <div
                onClick={handleCreateBill}
                className="flex items-center justify-center rounded-md border-white h-72 border-2 border-solid cursor-pointer"
            >
                <PlusIcon className="w-20 h-20" />
            </div>
            {bills.map((bill: IBill) => (
                <BillDetail key={bill._id} {...bill} />
            ))}

            <Outlet />
        </div>
    );
}
