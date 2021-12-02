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
            quizCollections
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
            quizCollections
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
            quizCollections
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
            quizCollections
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
            quizCollections
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
            quizCollections
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
            quizCollections
            createdAt
        }
    }
`;

export const DELETE_PLATFORM = gql`
    mutation deletePlatform($platformId: ID!) {
        deletePlatform(platformId: $platformId)
    }
`;

export const SET_FEATURED_QUIZ = gql`
    mutation setFeaturedQuiz($profilePlatformId: ID!, $quizId: ID!) {
        setFeaturedQuiz(profilePlatformId: $profilePlatformId, quizId: $quizId) {
            _id
            title 
            titleImg
            description
            creator
            quizHits
        }
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
    mutation deleteQuiz($id: ID!) {
        deleteQuiz(id: $id)
    }
`;

export const UPDATE_QUIZ = gql`
    mutation updateQuiz($quizId: ID!, $updatedQuiz: QuizInput!){
        updateQuiz(quizId: $quizId, updatedQuiz: $updatedQuiz){
            _id
            
        }
    }
`;

export const CREATE_QUIZ_COLLECTION = gql`
    mutation createQuizCollection($owner: ID!, $name: String!) {
        createQuizCollection(owner: $owner, name: $name) {
            _id
            name
            creator
            img
            description
            quizzes
            createdAt
        }
    }
`;

export const DELETE_QUIZ_COLLECTION = gql`
    mutation deleteQuizCollection($quizCollectionId: ID!) {
        deleteQuizCollection(quizCollectionId: $quizCollectionId)
    }
`;

export const ADD_QUIZ_COLLECTION = gql`
    mutation addQuizCollection($platformId: ID!, $quizCollectionId: ID!) {
        addQuizCollection(platformId: $platformId, quizCollectionId: $quizCollectionId) {
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
            quizCollections
            createdAt
        }
    }
`;

export const REMOVE_QUIZ_COLLECTION = gql`
    mutation removeQuizCollection($platformId: ID!, $quizCollectionId: ID!) {
        removeQuizCollection(platformId: $platformId, quizCollectionId: $quizCollectionId)
    }
`;

export const ADD_QUIZ_TO_QUIZ_COLLECTION = gql`
    mutation AddQuizToQuizCollection($quizId: ID!, $quizCollectionId: ID!) {
        addQuizToQuizCollection(quizId: $quizId, quizCollectionId: $quizCollectionId) {
            _id
            name
            creator
            img
            description
            quizzes
            createdAt
        }
    }
`;

export const REMOVE_QUIZ_FROM_QUIZ_COLLECTION = gql`
    mutation RemoveQuizFromQuizCollection($quizId: ID!, $quizCollectionId: ID!) {
        removeQuizFromQuizCollection(quizId: $quizId, quizCollectionId: $quizCollectionId)
    }
`;

export const EDIT_QUIZ_COLLECTION = gql`
    mutation editQuizCollection($id: ID!, $updatedQuizCollection: QuizCollectionInput!){
        editQuizCollection(id: $id, updatedQuizCollection: $updatedQuizCollection) {
            _id
            name
            creator
            img
            description
            quizzes
            createdAt
        }
    }
`;

export const CREATE_DRAWING = gql`
    mutation createDrawing($image: String!, $rotation: Int!, $position: [Int!], $sizein: [Int!]) {
        createDrawing(image: $image, rotation: $rotation, position: $position, sizein: $sizein) {
            _id
        }
    }
`

export const UPDATE_DRAWING = gql`
    mutation updateDrawing($drawingId: ID!, $image: String!, $rotation: Int!, $position: [Int!], $sizein: [Int!]) {
        updateDrawing(drawingId: $drawingId, image: $image, rotation: $rotation, position: $position, sizein: $sizein)
    }
`

export const DELETE_DRAWING = gql`
    mutation removeDrawing($drawingId: ID!) {
        removeDrawing(drawingId: $drawingId)
    }
`

