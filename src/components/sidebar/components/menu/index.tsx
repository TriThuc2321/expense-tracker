import React, { useEffect, useState } from 'react';
import { useStore } from '~/store/hooks';
import { ArrowRightOnRectangleIcon, BanknotesIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import styles from './Menu.module.scss';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
    const listMenu = [
        {
            id: '0',
            name: 'Dashboard',
            path: '/',
        },
        {
            id: '1',
            name: 'Notification',
            path: '/notification',
        },
        {
            id: '2',
            name: 'Statistic',
            path: '/statistic',
        },
    ];

    const { pathname } = useLocation();
    const [activeMenu, setActiveMenu] = useState(pathname);

    return (
        <div className="mt-8">
            <p className="my-2 px-3 py-1 cursor-pointer">Workspace</p>
            {listMenu.map((menu) => (
                <Link key={menu.id} to={menu.path} onClick={() => setActiveMenu(menu.path)}>
                    <p
                        className={clsx(
                            { [styles.selected]: menu.path === activeMenu },
                            'my-2 px-3 py-1 cursor-pointer text-white',
                        )}
                    >
                        {menu.name}
                    </p>
                </Link>
            ))}
        </div>
    );
}
