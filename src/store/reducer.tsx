import { IUser } from './Types';

enum UserActionKind {
    SET = 'SET',
    REMOVE = 'REMOVE',
}

interface UserAction {
    type: UserActionKind;
    payload: IUser;
}

const initState: IUser = {
    id: 0,
    name: 'Thuc',
};

function userReducer(state: IUser, action: UserAction) {
    switch (action.type) {
        case 'SET':
            state = action.payload;
            return;
        case 'REMOVE':
            state = {
                id: 0,
                name: 'Default name',
            };
            return;
        default:
            return;
    }
}

export { initState };
export default userReducer;
