import { createContext } from 'react';
import { UserContextType } from './Types';

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
