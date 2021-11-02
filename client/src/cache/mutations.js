import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!) {
        login(username: $username, email: $email) {
            _id
            username
            email
            profileId
            quests {
                _id
                isCompleted
                image
            }
            createdAt
            token
        }
    }
`;

export const UPDATE_USERNAME = gql`
    mutation updateUsername($id: ID!, $name: String!){
        updateUsername(id: $id, name: $name){
            _id
            username
            email 
            profileId 
            createdAt
        }
    }
`;