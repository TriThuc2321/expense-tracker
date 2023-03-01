import { graphQLRequest } from '../request';

const TYPE_ID = {
    GENERAL: '63f79ef19d06dca6f9214ff6',
    SPECIFIC: '63f79ef79d06dca6f9214ff8',
};

const createProduct = async (
    buyerId: string,
    billId: string,
    name: string,
    price: number,
    typeId: 'GENERAL' | 'SPECIFIC',
) => {
    const query = `mutation AddProduct($name: String!, $typeId: String!, $buyerId: String!, $billId: String!, $price: Int) {
        addProduct(name: $name, typeId: $typeId, buyerId: $buyerId, billId: $billId, price: $price) {
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
      }`;

    const data = await graphQLRequest({
        query,
        variables: { buyerId, billId, name, price, typeId: TYPE_ID[typeId] },
    });

    return data;
};

const updateProduct = async (buyerId: string, productId: string, name: string, price: number) => {
    const query = `mutation UpdateProduct($productId: String!, $name: String, $price: Int, $buyerId: String) {
        updateProduct(productId: $productId, name: $name, price: $price, buyerId: $buyerId) {
          buyer {
            email
          }
          name
          price
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: { buyerId, productId, name, price },
    });

    return data;
};

const deleteProduct = async (productId: string) => {
    const query = `mutation DeleteProduct($productId: String!) {
        deleteProduct(productId: $productId) {
          message
          type
        }
      }`;

    const data = await graphQLRequest({
        query,
        variables: { productId },
    });

    return data;
};

export { createProduct, deleteProduct, updateProduct };
