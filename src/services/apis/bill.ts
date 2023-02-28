import { graphQLRequest } from '../request';

export const billsLoader = async ({ params: { workspaceId } }: any) => {
    const query = `query Query($workspaceId: String!) {
        bills(workspaceId: $workspaceId) {
          _id
          generals {
            _id
            buyer {
              _id
              email
              name
              picture
              uid
            }
            name
            price
          }
          buyer {
            _id
            uid
            name
            picture
            email
          }
          specifics {
            _id
            name
            price
            buyer {
              _id
              uid
              name
              picture
              email
            }
          }
          updatedAt
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: {
            workspaceId: workspaceId ? workspaceId : '',
        },
    });
    return data ? data : null;
};
