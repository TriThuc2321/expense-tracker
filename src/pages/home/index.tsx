import clsx from 'clsx';
import styles from './Home.module.scss';

import { Header } from './components';

function Home() {
    return (
        <div className={clsx(styles.container)}>
            <Header />
            <button className='btn btn-primary"\'>Primary button</button>
            <p>Hom2e</p>
        </div>
    );
}

export default Home;
