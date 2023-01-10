import clsx from 'clsx';
import styles from './Home.module.scss';
import { useEffect } from 'react';

import logo from '~/assets/logo.png';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

import { user } from '~/mocks';
import { useStore } from '~/store/hooks';

function Header() {
    const { store, setUser, getUser } = useStore();
    useEffect(() => {
        const user = getUser();
        console.log(user);
    }, []);

    return (
        <div className="fixed top-4 w-full h-16 flex flex-row justify-between items-center px-8">
            <div className="flex items-center">
                <img className="w-10 h-10" src={logo} alt="Expense tracker" />
                <p className="font-bold ml-4">EXPENSE TRACKER</p>
            </div>

            <div className="flex items-center">
                <BellAlertIcon className="h-8 w-8 mr-4" aria-hidden="true" />

                <img className="h-10 w-10 rounded-full" src={user.picture} alt="" />
            </div>
        </div>
    );
}

export default Header;
