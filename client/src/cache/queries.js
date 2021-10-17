import gql from 'graphql-tag';

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