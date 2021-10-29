import gql from 'graphql-tag';

export const FETCH_USERS = gql`
    query getUsers {
        getUsers {
            id
            username
            email
            profileId
            quests {
                questId
                isCompleted
                image {
                    id
                }
            }
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
            profileId
            quests {
                questId
                isCompleted
                image {
                    id
                }
            }
            createdAt
        }
    }
`;