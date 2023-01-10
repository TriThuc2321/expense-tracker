import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Home, Login } from '~/pages';
import { StoreProvider } from '~/store/storeProvider';

const AuthLayout = () => (
    <StoreProvider>
        <Outlet />
    </StoreProvider>
);

export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: <Home />,
                path: '/',
            },
        ],
    },
]);
