import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!) {
        login(username: $username, email: $email) {
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
            token
        }
    }
`;

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