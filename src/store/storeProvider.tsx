import { ReactNode, useReducer, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from './storeContext';
import { IStore, IUser, IWorkspace } from '~/interfaces';
import { Loader } from '~/pages';
import { storeReducer, EStoreAction } from './storeReducer';
import { getWorkspaceByEmail } from '~/services/apis/workspace';

interface ProviderProps {
    children: ReactNode;
}

const INIT_USER: IUser = {
    userId: '',
    fullName: '',
    picture: '',
    email: '',
    workspaces: [],
};

const INIT_WORKSPACE: IWorkspace = {
    workspaceId: '',
    workspaceName: '',
};

const INIT_STATE: IStore = {
    user: INIT_USER,
    workspace: INIT_WORKSPACE,
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
                const { uid, displayName, email, photoURL } = user;
                const res = await getWorkspaceByEmail(email);
                setUser({
                    fullName: displayName,
                    userId: uid,
                    email,
                    picture: photoURL,
                    workspaces: res?.data,
                });

                if (user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken);
                    window.location.reload();
                }
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
