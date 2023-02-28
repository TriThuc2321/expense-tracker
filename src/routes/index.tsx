import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';
import { Home, Login, Error } from '~/pages';
import { StoreProvider } from '~/store/storeProvider';
import { Dashboard, Notification, Statistic } from '~/components';
import { getMyWorkspace } from '~/services/apis/workspace';
import { billsLoader } from './../services/apis/bill';

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
                path: '/login',
                element: <Login />,
            },
            {
                path: '/',
                element: <Home />,
                loader: getMyWorkspace,
                children: [
                    {
                        path: '/',
                        element: <Dashboard />,
                        loader: billsLoader,
                    },
                    {
                        path: '/workspace/:workspaceId',
                        element: <Dashboard />,
                        loader: billsLoader,
                    },

                    {
                        path: '/notification',
                        element: <Notification />,
                    },
                    {
                        path: '/statistic',
                        element: <Statistic />,
                    },
                ],
            },
        ],
    },
]);
