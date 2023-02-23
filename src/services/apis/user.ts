import { graphQLRequest } from '~/services/request';
import { INewUser } from '~/interfaces';

const getUserByEmail = async (email: string) => {
    const query = `query User($email: String!) {
        user(email: $email) {
          _id
          email
          name
          picture
          uid
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: { email },
    });

    return data;
};

const addNewUser = async (newUser: INewUser) => {
    const query = `mutation AddUser($uid: String!, $email: String!, $picture: String, $name: String!) {
        addUser(uid: $uid, email: $email, picture: $picture, name: $name) {
          _id
          email
          name
          picture
          uid
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: { ...newUser },
    });

    return data;
};

export { getUserByEmail, addNewUser };
