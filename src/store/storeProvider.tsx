import { ReactNode, useReducer, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from './storeContext';
import { IStore, IUser, IWorkspace } from '~/interfaces';
import { Loader } from '~/pages';
import { storeReducer, EStoreAction } from './storeReducer';
import { getMyWorkspace } from '~/services/apis/workspace';
import { addNewUser } from '~/services/apis/user';

interface ProviderProps {
    children: ReactNode;
}

const INIT_USER: IUser = {
    _id: '',
    uid: '',
    name: '',
    picture: '',
    email: '',
};

const INIT_WORKSPACE: IWorkspace = {
    _id: '',
    name: '',
    host: INIT_USER,
};

const INIT_STATE: IStore = {
    user: INIT_USER,
    workspace: INIT_WORKSPACE,
    workspaces: [],
};

export const StoreProvider = ({ children }: ProviderProps) => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [store, dispatch] = useReducer(storeReducer, INIT_STATE);
    const [loading, setLoading] = useState(true);

    const setUser = (user: IUser) => {
        dispatch({ type: EStoreAction.SET_USER, payload: user });
    };

    const setSelectWorkspace = (workspace: IWorkspace) => {
        dispatch({ type: EStoreAction.SET_SELECTED_WORKSPACE, payload: workspace });
    };

    const setWorkspaces = (workspaces: Array<IWorkspace>) => {
        dispatch({ type: EStoreAction.SET_WORKSPACES, payload: workspaces });
    };

    useEffect(() => {
        // auth.signOut();
        const authHandle = auth.onIdTokenChanged(async (user: any) => {
            if (user?.uid) {
                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
                const { uid, displayName, email, photoURL } = user;
                const newUser = {
                    uid,
                    name: displayName,
                    email,
                    picture: photoURL,
                };
                const resAddUser = await addNewUser(newUser);
                setUser(resAddUser.addUser);

                const resMyWorkspaces = await getMyWorkspace();
                setWorkspaces(resMyWorkspaces.myWorkspaces);
            } else {
                setUser(INIT_USER);
                localStorage.clear();
                navigate('/login');
            }
            setLoading(false);
        });

        return () => authHandle();
    }, [auth]);

    return (
        <StoreContext.Provider value={{ store, setUser, setSelectWorkspace, setWorkspaces }}>
            {loading ? <Loader /> : children}
        </StoreContext.Provider>
    );
};
