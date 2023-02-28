import { Outlet } from 'react-router-dom';
import { Header } from './components';

export default function Dashboard() {
    return (
        <div className="w-full relative">
            <Header />
            <Outlet />
        </div>
    );
}
