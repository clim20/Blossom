import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!, $profileImg: String!) {
        login(username: $username, email: $email, profileImg: $profileImg) {
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

export const FOLLOW_PROFILE = gql`
    mutation followProfile($userId: ID!, $profileId: ID!){
        followProfile(userId: $userId, profileId: $profileId)
    }    
`;

export const FOLLOW_PLATFORM = gql`
    mutation followPlatform($userId: ID!, $platformId: ID!){
        followPlatform(userId: $userId, platformId: $platformId)
    }
`;

export const EDIT_PROFILE = gql`
    mutation editProfile($id: ID!, $updatedProfile: ProfileInput!){
        editProfile(id: $id, updatedProfile: $updatedProfile) {
            _id
            user
            profileImg
            bannerImg
            badges
            description
            contact
            followerCount
            following
            quizzes
            collections
            platforms
        }
    }
`;

export const EDIT_PLATFORM = gql`
    mutation editPlatform($id: ID!, $updatedPlatform: PlatformInput!){
        editPlatform(id: $id, updatedPlatform: $updatedPlatform) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const ADD_COLLABORATOR = gql`
    mutation addCollaborator($platformId: ID!, $userId: ID!) {
        addCollaborator(platformId: $platformId, userId: $userId) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const REMOVE_COLLABORATOR = gql`
    mutation removeCollaborator($platformId: ID!, $userId: ID!) {
        removeCollaborator(platformId: $platformId, userId: $userId) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const ADD_COLLABORATOR_REQUEST = gql`
    mutation addCollaboratorRequest($platformId: ID!, $userId: ID!) {
        addCollaboratorRequest(platformId: $platformId, userId: $userId) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const REMOVE_COLLABORATOR_REQUEST = gql`
    mutation removeCollaboratorRequest($platformId: ID!, $userId: ID!) {
        removeCollaboratorRequest(platformId: $platformId, userId: $userId) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const CREATE_PLATFORM = gql`
    mutation createPlatform($owner: ID!, $name: String!) {
        createPlatform(owner: $owner, name: $name) {
            _id
            name
            owner
            platformImg
            bannerImg
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const DELETE_PLATFORM = gql`
    mutation deletePlatform($platformId: ID!) {
        deletePlatform(platformId: $platformId)
    }
`;

export const CREATE_QUIZ = gql`
    mutation createQuiz($owner: ID!, $title: String!) {
        createQuiz(owner: $owner, title: $title) {
            _id
        }
    }
`;

export const DELETE_QUIZ = gql`
    mutation deleteQuiz($platformId: ID!) {
        deleteQuiz(platformId: $platformId)
    }
`;