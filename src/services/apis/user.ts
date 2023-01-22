import { request, METHODS } from '~/services/request';
import { IUser } from '~/interfaces';

const getUserById = async (id: string) => await request(`user/${id}`, METHODS.GET);
const addUser = async (user: IUser) => await request('user', METHODS.POST, user);

export { getUserById, addUser };
