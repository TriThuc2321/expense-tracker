import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Menu, Footer, Header } from './components';
import clsx from 'clsx';

export default function Sidebar() {
    const [hideMenu, setHideMenu] = useState(true);
    return (
        <div>
            <div
                className={clsx(
                    { ['hidden']: hideMenu },
                    'bg-primary min-w-max h-screen p-6 fixed z-10 tablet:relative tablet:block',
                )}
            >
                <Header setHideMenu={setHideMenu} />
                <Menu setHideMenu={setHideMenu} />
                <Footer />
            </div>

            <Bars3Icon className="fixed top-4 left-4" width={28} height={36} onClick={() => setHideMenu(false)} />
        </div>
    );
}
