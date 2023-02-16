import { request, METHODS } from '~/services/request';
import { IWorkspace } from '~/interfaces';

const getWorkspacesByEmail = async (email: string) => await request(`workspace/list/email/${email}`, METHODS.GET);
const getUsersByWorkspaceId = async (id: string) => await request(`workspace/list/id/${id}`, METHODS.GET);

const addWorkspace = async (workspace: IWorkspace) => await request('workspace', METHODS.POST, workspace);

const updateWorkspace = async (workspace: IWorkspace) => await request('workspace', METHODS.PUT, workspace);

const deleteWorkspace = async (workspaceId: string | undefined) =>
    await request(`workspace/${workspaceId}`, METHODS.DELETE);

export { getWorkspacesByEmail, addWorkspace, getUsersByWorkspaceId, updateWorkspace, deleteWorkspace };
