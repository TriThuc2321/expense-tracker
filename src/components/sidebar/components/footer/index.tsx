import React from 'react';
import { getAuth } from 'firebase/auth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Footer() {
    const auth = getAuth();
    const logoutHandle = () => {
        auth.signOut();
    };

    return (
        <div className="left-4 bottom-4 w-full mt-11">
            <div className="w-full h-0.5 bg-unselected" />
            <div className="flex items-center mt-2 cursor-pointer" onClick={logoutHandle}>
                <ArrowRightOnRectangleIcon height={20} />
                <p className="ml-2">Logout</p>
            </div>
        </div>
    );
}
