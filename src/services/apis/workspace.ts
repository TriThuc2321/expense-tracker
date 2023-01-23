import { request, METHODS } from '~/services/request';
import { IWorkspace } from '~/interfaces';

const getWorkspaceByUserId = async (userId: string) => await request(`workspace/userId/${userId}`, METHODS.GET);
const addWorkspace = async (workspace: IWorkspace) => await request('workspace', METHODS.POST, workspace);

export { getWorkspaceByUserId, addWorkspace };
