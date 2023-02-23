import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Home, Login, Error } from '~/pages';
import { StoreProvider } from '~/store/storeProvider';
import { Dashboard, Notification, Statistic } from '~/components';
import { getMyWorkspace } from '~/services/apis/workspace';

const AuthLayout = () => (
    <StoreProvider>
        <Outlet />
    </StoreProvider>
);

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: <Home />,
                path: '/',
                children: [
                    {
                        element: <Dashboard />,
                        path: '/',
                    },
                    {
                        element: <Notification />,
                        path: '/notification',
                    },
                    {
                        element: <Statistic />,
                        path: '/statistic',
                    },
                ],
            },
        ],
    },
]);
