import { IStore, IUser } from '~/interfaces';

enum EStoreAction {
    SET_USER = 'SET_USER',
    REMOVE_USER = 'REMOVE_USER',
}

type STORE_ACTION = { type: EStoreAction.SET_USER; payload: IUser } | { type: EStoreAction.REMOVE_USER; payload: null };

const storeReducer = (state: IStore, action: STORE_ACTION): IStore => {
    switch (action.type) {
        case EStoreAction.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export { storeReducer, EStoreAction };
