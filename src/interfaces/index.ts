interface IUser {
    id: string;
    name: string;
    picture: string;
    email: string;
}

interface IWorkspace {
    id: string;
    title: string;
    users: Array<IUser>;
}

interface IProduct {
    id: string;
    name: string;
    price: number;
}

interface IBill {
    id: string;
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
}

export type { IWorkspace, IProduct, IBill, IUser, IStore };
