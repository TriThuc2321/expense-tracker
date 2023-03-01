import { graphQLRequest } from '~/services/request';

const getMyWorkspace = async (userId: string) => {
    const query = `query Query($userId: String!) {
      myWorkspaces(userId: $userId) {
        _id
        name
        collaborators {
          _id
          uid
          name
          picture
          email
        }
        host {
          _id
          uid
          name
          picture
          email
        }
        updatedAt
      }
    }`;

    const data = await graphQLRequest({
        query,
        variables: { userId },
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

const deleteWorkspace = async (_id: string | undefined) => {
    const query = `mutation DeleteWorkspace($id: String!) {
      deleteWorkspace(_id: $id) {
        message
        type
      }
    }`;

    const data = await graphQLRequest({
        query,
        variables: { id: _id },
    });
    return data;
};

export { getMyWorkspace, addWorkspace, getUsersByWorkspaceId, updateWorkspace, deleteWorkspace };
