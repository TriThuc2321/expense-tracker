interface INewUser {
    uid: string;
    name: string | null;
    picture: string | null;
    email: string;
}

interface IUser extends INewUser {
    _id: string;
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
}

interface IBill {
    _id: string;
    total: number;
    createAt: string;
    user: IUser;
    generals: Array<IProduct>;
    generalTotal: number;
    specificTotal: number;
    specifics: Array<IProduct>;
}

interface IStore {
    user: IUser;
    workspaces: Array<IWorkspace>;
    workspace: IWorkspace;
}

export type { IWorkspace, IProduct, IBill, IUser, INewUser, IStore };
