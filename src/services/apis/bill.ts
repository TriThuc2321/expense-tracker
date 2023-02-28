import { graphQLRequest } from '../request';

const billsLoader = async (workspaceId: string) => {
    const query = `query Query($workspaceId: String!) {
      bills(workspaceId: $workspaceId) {
        _id
        generals {
          _id
          buyer {
            _id
            uid
            name
            picture
            email
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
          buyer {
            _id
            uid
            name
            picture
            email
          }
          name
          price
        }
        createdAt
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

const billLoader = async ({ params: { billId } }: any) => {
    const query = `query Query($billId: String!) {
      bill(billId: $billId) {
        _id
        buyer {
          _id
          uid
          name
          picture
          email
        }
        generals {
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
        createdAt
      }
    }`;

    const data = await graphQLRequest({
        query,
        variables: {
            billId: billId ? billId : '',
        },
    });

    return data ? data : null;
};

const createBill = async (buyerId: string, workspaceId: string) => {
    const query = `mutation AddBill($buyerId: String!, $workspaceId: String!) {
    addBill(buyerId: $buyerId, workspaceId: $workspaceId) {
      _id
      createdAt
    }
  }`;
    const data = await graphQLRequest({
        query,
        variables: { buyerId, workspaceId },
    });

    return data;
};

export { billsLoader, billLoader, createBill };
