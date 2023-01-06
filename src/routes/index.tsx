import { Home, Login } from '~/pages';
import routesConfig from '~/configs/routes';

const routes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.login, component: Login },
];

export { routes };
