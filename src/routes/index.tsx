import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Home, Login, Error } from '~/pages';
import { StoreProvider } from '~/store/storeProvider';
import { Dashboard, Notification, Statistic } from '~/components';
import { billLoader, billsLoader } from '~/services/apis/bill';
import { Bills, BillForm } from '~/components';

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
                children: [
                    {
                        path: '/',
                        element: <Dashboard />,
                        children: [
                            {
                                path: 'workspace/:workspaceId',
                                element: <Bills />,
                                children: [
                                    {
                                        path: 'bill/:billId',
                                        element: <BillForm />,
                                        loader: billLoader,
                                    },
                                ],
                            },
                        ],
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
