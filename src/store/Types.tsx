export interface IUser {
    id: number;
    name: string;
}

type UserContextType = {
    user: IUser;
    setUser: (user: IUser) => void;
};

export type { UserContextType };
