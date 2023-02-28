import { IStore, IUser, IWorkspace } from '~/interfaces';

enum EStoreAction {
    SET_USER = 'SET_USER',
    REMOVE_USER = 'REMOVE_USER',
    SET_SELECTED_WORKSPACE = 'SET_SELECTED_WORKSPACE',
    SET_WORKSPACES = 'SET_WORKSPACES',
}

type STORE_ACTION = { type: EStoreAction; payload: any };

const storeReducer = (state: IStore, action: STORE_ACTION): IStore => {
    switch (action.type) {
        case EStoreAction.SET_USER:
            return {
                ...state,
                user: action.payload as IUser,
            };
        case EStoreAction.SET_SELECTED_WORKSPACE:
            return {
                ...state,
                selectedWorkspace: action.payload as IWorkspace,
            };
        case EStoreAction.SET_WORKSPACES:
            return {
                ...state,
                workspaces: action.payload as Array<IWorkspace>,
            };

        default:
            return state;
    }
};

export { storeReducer, EStoreAction };
