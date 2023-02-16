import { Sidebar } from '~/components';
import { Outlet } from 'react-router-dom';

function Home() {
    return (
        <div className="cursor-context-menu flex w-screen h-screen overflow-hidden">
            <Sidebar />
            <Outlet />
        </div>
    );
}

export default Home;
