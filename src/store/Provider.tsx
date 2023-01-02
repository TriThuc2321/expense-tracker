/* eslint-disable @typescript-eslint/no-unused-vars */
import { useReducer, ReactNode } from 'react';
import UserContext from './Context';
import userReducer, { initState } from './reducer';
import { useState } from 'react';

type ProviderChild = {
    children: ReactNode;
};

function Provider({ children }: ProviderChild) {
    const [state, setState] = useReducer(useReducer, initState);

    return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
}

export default Provider;
