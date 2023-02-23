import { graphQLRequest, request, METHODS } from '~/services/request';
import { IWorkspace } from '~/interfaces';

const getMyWorkspace = async () => {
    const query = `query MyWorkspaces {
      myWorkspaces {
        _id
        collaborators {
          picture
          _id
          email
          name
          uid
        }
        createdAt
        host {
          email
          _id
          name
          picture
          uid
        }
        name
        updatedAt
      }
    }`;

    const data = await graphQLRequest({
        query,
    });

    return data;
};
const getUsersByWorkspaceId = async (workspaceId: string) => {
    const query = `query Query($workspaceId: String!) {
      users(workspaceId: $workspaceId) {
        _id
        email
        name
        picture
        uid
      }
    }`;

    const data = await graphQLRequest({
        query,
        variables: { workspaceId },
    });

    return data;
};

interface INewWorkspaceProps {
    name: string;
    host: string;
    collaborators: Array<string>;
}

const addWorkspace = async ({ name, host, collaborators }: INewWorkspaceProps) => {
    const query = `mutation AddWorkspace($name: String!, $host: String!, $collaborators: [String]) {
          addWorkspace(name: $name, host: $host, collaborators: $collaborators) {
            _id
            name
          }
        }`;

    const data = await graphQLRequest({
        query,
        variables: { name, host, collaborators },
    });

    return data;
};

interface IUpdateWorkspaceProps {
    name: string;
    _id: string;
    collaborators: Array<string>;
}

const updateWorkspace = async ({ name, _id, collaborators }: IUpdateWorkspaceProps) => {
    const query = `mutation UpdateWorkspace($id: String!, $name: String, $collaborators: [String]) {
          updateWorkspace(_id: $id, name: $name, collaborators: $collaborators) {
          _id
          name
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: { name, id: _id, collaborators },
    });

    return data;
};

const deleteWorkspace = async (workspaceId: string | undefined) =>
    await request(`workspace/${workspaceId}`, METHODS.DELETE);

export { getMyWorkspace, addWorkspace, getUsersByWorkspaceId, updateWorkspace, deleteWorkspace };
