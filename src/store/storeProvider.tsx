import { StoreContext } from './storeContext';
import { ReactNode, useReducer, useEffect, useState } from 'react';
import { IStore, IUser } from '~/interfaces/user';
import { storeReducer, EStoreAction } from './storeReducer';
import { getAuth } from 'firebase/auth';

import { Loader } from '~/components';
import { useNavigate } from 'react-router-dom';

interface ProviderProps {
    children: ReactNode;
}

const INIT_USER: IUser = {
    id: '',
    name: '',
    picture: '',
    email: '',
};

const INIT_STATE: IStore = {
    user: INIT_USER,
};

export const StoreProvider = ({ children }: ProviderProps) => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [store, dispatch] = useReducer(storeReducer, INIT_STATE);
    const [loading, setLoading] = useState(true);

    const setUser = (user: IUser) => {
        dispatch({ type: EStoreAction.SET_USER, payload: user });
    };

    useEffect(() => {
        const authHandle = auth.onIdTokenChanged((user: any) => {
            if (user?.uid) {
                const { uid, displayName, email, photoURL } = user;
                setUser({
                    name: displayName,
                    id: uid,
                    email,
                    picture: photoURL,
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

    return <StoreContext.Provider value={{ store, setUser }}>{loading ? <Loader /> : children}</StoreContext.Provider>;
};
