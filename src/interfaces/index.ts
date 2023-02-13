interface IUser {
    userId: string;
    fullName: string | undefined;
    picture: string | undefined;
    email: string;
    workspaces: Array<IWorkspace> | undefined;
}

interface IWorkspace {
    workspaceId: string;
    workspaceName: string;
    email: string;
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
    workspace: IWorkspace;
}

export type { IWorkspace, IProduct, IBill, IUser, IStore };
