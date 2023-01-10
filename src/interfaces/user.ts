interface IUser {
    id: string;
    name: string;
    picture: string;
    email: string;
}

interface IStore {
    user: IUser;
}

export type { IUser, IStore };
