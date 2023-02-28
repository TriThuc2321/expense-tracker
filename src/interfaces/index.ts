interface INewUser {
    uid: string;
    name: string | null;
    picture: string | null;
    email: string;
}

interface IUser extends INewUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface IWorkspace {
    _id: string;
    name: string;
    host: IUser;
    collaborators: Array<IUser>;
    bills: Array<IBill>;
    createdAt: string;
    updatedAt: string;
}

interface IProduct {
    _id: string;
    name: string;
    price: number;
    buyer: IUser;
    createdAt: string;
    updatedAt: string;
}

interface IBill {
    _id: string;
    buyer: IUser;
    generals: Array<IProduct>;
    specifics: Array<IProduct>;
    createdAt: string;
    updatedAt: string;
}

interface IStore {
    user: IUser;
    workspaces: Array<IWorkspace>;
    bills: Array<IBill>;
    selectedWorkspace: IWorkspace;
}

export type { IWorkspace, IProduct, IBill, IUser, INewUser, IStore };
