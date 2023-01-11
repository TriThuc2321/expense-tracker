import React from 'react';
import { useStore } from '~/store/hooks';
import { ArrowRightOnRectangleIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { getAuth } from 'firebase/auth';

type Props = {
    menuDisplayHandle: () => void;
};

export default function Menu({ menuDisplayHandle }: Props) {
    const { getUser } = useStore();
    const user = getUser();
    const auth = getAuth();
    const logoutHandle = () => {
        menuDisplayHandle();
        auth.signOut();
    };

    return (
        <div className="rounded-lg w-40 px-4 py-2 absolute bg-white text-primary top-16 right-8">
            <p className="font-bold">{user.name}</p>

            <div className="flex items-center mt-2 cursor-pointer">
                <BanknotesIcon height={20} />
                <p className="ml-2">History</p>
            </div>
            <div className="mt-6 w-full h-0.5 bg-primary rounded-full" />
            <div className="flex items-center mt-2 cursor-pointer" onClick={logoutHandle}>
                <ArrowRightOnRectangleIcon height={20} />
                <p className="ml-2">Logout</p>
            </div>
        </div>
    );
}
