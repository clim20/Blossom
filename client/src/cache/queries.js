import gql from 'graphql-tag';

export const FETCH_USERS = gql`
    query getUsers {
        getUsers {
            id
            username
            email
            scores
            createdAt
        }
    }
`;

export const FIND_USER_BY_ID = gql`
    query findUserById($id: ID!) {
        findUserById(id: $id) {
            id
            username
            email
            scores
            createdAt
        }
    }
`;