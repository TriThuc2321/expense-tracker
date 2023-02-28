import { createContext } from 'react';
import { IStore, IUser, IWorkspace } from '~/interfaces';

export type StoreContextPros = {
    store: IStore;
    setUser: (user: IUser) => void;
    setSelectedWorkspace: (workspace: IWorkspace) => void;
    setWorkspaces: (workspaces: Array<IWorkspace>) => void;
};
export const StoreContext = createContext<StoreContextPros>({} as StoreContextPros);
