import { createContext } from 'react';
import { IStore, IUser } from '~/interfaces';

export type StoreContextPros = {
    store: IStore;
    setUser: (user: IUser) => void;
};
export const StoreContext = createContext<StoreContextPros>({} as StoreContextPros);
