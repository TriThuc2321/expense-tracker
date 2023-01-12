import React, { useEffect, useState } from 'react';
import { useStore } from '~/store/hooks';
import { CodeBracketIcon, BellIcon, ChartBarIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import styles from './Menu.module.scss';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
    const listMenu = [
        {
            id: '0',
            name: 'Dashboard',
            path: '/',
            icon: <CodeBracketIcon className="h-6 w-6" />,
        },
        {
            id: '1',
            name: 'Notification',
            path: '/notification',
            icon: <BellIcon className="h-6 w-6" />,
        },
        {
            id: '2',
            name: 'Statistic',
            path: '/statistic',
            icon: <ChartBarIcon className="h-6 w-6" />,
        },
    ];

    const { pathname } = useLocation();
    const [activeMenu, setActiveMenu] = useState(pathname);

    return (
        <div className="mt-8">
            <p className="my-2 px-3 py-1 cursor-pointer">Workspace</p>
            {listMenu.map((menu) => (
                <Link key={menu.id} to={menu.path} onClick={() => setActiveMenu(menu.path)}>
                    <div
                        className={clsx(
                            { [styles.selected]: menu.path === activeMenu },
                            'my-2 px-4 py-2 cursor-pointer text-white flex items-center',
                        )}
                    >
                        {menu.icon}
                        <p className="ml-4">{menu.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
