import logo from '~/assets/logo.png';
import { BellIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';

import { useStore } from '~/store/hooks';
import { Menu } from '../index';
import { useState } from 'react';

function Header() {
    const { getUser } = useStore();
    const user = getUser();

    const [displayMenu, setDisplayMenu] = useState(false);

    const menuDisplayHandle = () => {
        setDisplayMenu(!displayMenu);
    };

    return (
        <div className="fixed top-4 w-full h-16 flex flex-row justify-between items-center px-8">
            <div className="flex items-center">
                <img className="w-10 h-10" src={logo} alt="Expense tracker" />
                <p className="font-bold ml-4">EXPENSE TRACKER</p>
            </div>

            <div className="flex items-center">
                <BellAlertIcon className="h-8 w-8 mr-4 cursor-pointer" aria-hidden="true" />

                <div>
                    <img
                        className="h-10 w-10 rounded-full cursor-pointer"
                        src={user.picture}
                        alt=""
                        onClick={menuDisplayHandle}
                    />
                    {displayMenu && <Menu menuDisplayHandle={menuDisplayHandle} />}
                </div>
            </div>
        </div>
    );
}

export default Header;
