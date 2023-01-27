import { request, METHODS } from '~/services/request';
import { IWorkspace } from '~/interfaces';

const getWorkspaceByEmail = async (email: string) => await request(`workspace/email/${email}`, METHODS.GET);
const addWorkspace = async (workspace: IWorkspace) => await request('workspace', METHODS.POST, workspace);

export { getWorkspaceByEmail, addWorkspace };
