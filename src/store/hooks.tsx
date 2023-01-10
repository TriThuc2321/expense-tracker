import { useContext } from 'react';
import { StoreContext } from './storeContext';

export const useStore = () => {
    const { store, setUser } = useContext(StoreContext);

    return {
        store,
        getUser: () => store.user,
        setUser,
    };
};
