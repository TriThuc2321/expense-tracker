import { request, METHODS } from '~/services/request';
import { IUser } from '~/interfaces';

const getUserById = async (email: string) => await request(`user/${email}`);
const checkEmailExisted = async (email: string) => await request(`user/emailExisted/${email}`);

const addUser = async (user: IUser) => await request('user', METHODS.POST, user);

export { getUserById, addUser, checkEmailExisted };
