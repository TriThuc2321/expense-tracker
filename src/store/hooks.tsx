import { useContext } from 'react';
import { StoreContext } from './storeContext';

export const useStore = () => {
    const { store, setUser, setSelectWorkspace, setWorkspaces } = useContext(StoreContext);

    return {
        store,
        getUser: () => store.user,
        setUser,
        setSelectWorkspace,
        setWorkspaces,
    };
};
