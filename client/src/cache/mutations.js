import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!) {
        login(username: $username, email: $email) {
            id
            username
            email
            scores
            createdAt
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
            }
        ) {
            id
            username
            email
            scores
            createdAt
            token
        }
    }
`

export const UPDATE_SCORE = gql`
    mutation updateScore($id: ID!, $score: Int!) {
        updateScore(id: $id, score: $score) {
            id
            username
            email
            scores
            createdAt
        }
    }
`;