import { useState, useEffect } from 'react';
import { CodeBracketIcon, ChartBarIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import styles from './Menu.module.scss';
import { Link, useLocation } from 'react-router-dom';

interface IMenuProps {
    setHideMenu: (arg0: boolean) => void;
}

export default function Menu({ setHideMenu }: IMenuProps) {
    const menus = [
        {
            id: '0',
            name: 'Dashboard',
            path: '/',
            icon: <CodeBracketIcon className="h-6 w-6" />,
        },
        {
            id: '1',
            name: 'Statistic',
            path: '/statistic',
            icon: <ChartBarIcon className="h-6 w-6" />,
        },
    ];

    const [listMenu, setListMenu] = useState(menus);
    const { pathname } = useLocation();
    const [activeMenu, setActiveMenu] = useState(pathname);

    const recentWorkspaceId = localStorage.getItem('recentWorkspaceId');
    useEffect(() => {
        setListMenu(
            listMenu.map((menu) =>
                menu.id !== '0'
                    ? menu
                    : {
                          ...menu,
                          path: `workspace/${recentWorkspaceId}`,
                      },
            ),
        );
    }, [recentWorkspaceId]);

    return (
        <div className="mt-8">
            {listMenu.map((menu) => (
                <Link
                    key={menu.id}
                    to={menu.path}
                    onClick={() => {
                        setActiveMenu(menu.path);
                        setHideMenu(true);
                    }}
                >
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
