import clsx from 'clsx';
import styles from './Home.module.scss';

import { Sidebar } from '~/components';
import { Outlet } from 'react-router-dom';

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Home;
