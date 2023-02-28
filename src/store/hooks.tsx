import { useContext } from 'react';
import { StoreContext } from './storeContext';

export const useStore = () => {
    const { store, setUser, setSelectedWorkspace, setWorkspaces } = useContext(StoreContext);

    return {
        store,
        getUser: () => store.user,
        getWorkspaces: () => store.workspaces,
        getSelectedWorkspace: () => store.selectedWorkspace,
        setUser,
        setWorkspaces,
        setSelectedWorkspace,
    };
};
