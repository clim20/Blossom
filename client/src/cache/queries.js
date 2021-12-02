import gql from 'graphql-tag';

export const FETCH_POPULAR_USERS = gql`
    query getPopularUsers {
        getPopularUsers {
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
        }
    }
`;

export const FIND_USER_BY_ID = gql`
    query findUserById($id: ID!) {
        findUserById(id: $id) {
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
        }
    }
`;

export const FETCH_USERS = gql`
    query getUsers {
        getUsers {
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
        }
    }
`;

export const FETCH_PROFILES = gql`
    query getProfiles {
        getProfiles {
            _id
            user
            profileImg
            bannerImg
            badges
            description
            contact
            followerCount
            following
            featuredQuiz
            quizzes
            quizCollections
            platforms
        }
    }
`;

export const FIND_PROFILE_BY_ID = gql`
    query findProfileById($id: ID!) {
        findProfileById(id: $id) {
            _id
            user
            profileImg
            bannerImg
            badges
            description
            contact
            followerCount
            following
            featuredQuiz
            quizzes
            quizCollections
            platforms
        }
    }
`;

export const FIND_FOLLOWING_BY_IDS = gql`
    query findFollowingByIds($ids: [ID!]!) {
        findFollowingByIds(ids: $ids) {
            __typename
            ... on User {
                _id
                username
                profileId
            }
            ... on Platform {
                _id
                name
                platformImg
                followerCount
            }
        }
    }
`;

export const FETCH_POPULAR_PLATFORMS = gql`
    query getPopularPlatforms {
        getPopularPlatforms {
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

export const FETCH_PLATFORMS = gql`
    query getPlatforms {
        getPlatforms {
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
            featuredQuiz
            quizzes
            quizCollections
            createdAt
        }
    }
`;

export const FIND_PLATFORM_BY_ID = gql`
    query findPlatformById($id: ID!) {
        findPlatformById(id: $id) {
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
            featuredQuiz
            quizzes
            quizCollections
            createdAt
        }
    }
`;

export const FIND_PLATFORMS_BY_IDS = gql`
    query findPlatformsByIds($ids: [ID!]!) {
        findPlatformsByIds(ids: $ids) {
            _id
            name
            platformImg
            followerCount
        }
    }
`;

export const GET_QUIZZES = gql`
    query getQuizzes{
        getQuizzes {
            _id
            title
            description
            titleImg
            creator
            platformId
            quizHits
            quizLikes
            quizDislikes
            badges{
                rank
                image
            }
            scores{
                user
                userScore
                bestScore
                liked
            }
            cards{
                cardNum
                question
                choices
                answer
                answerExplanation
                questionImg
                answerImg
                drawing
                drawing2
            }
            createdAt
        }
    }
`;

export const FIND_QUIZZES_BY_IDS = gql`
    query findQuizzesByIds($ids: [ID!]!) {
        findQuizzesByIds(ids: $ids) {
            _id
            title
            description
            titleImg
            creator
            platformId
            quizHits
            quizLikes
            quizDislikes
            badges{
                rank
                image
            }
            scores{
                user
                userScore
                bestScore
                liked
            }
            cards{
                cardNum
                question
                choices
                answer
                answerExplanation
                questionImg
                answerImg
                drawing
                drawing2
            }
            createdAt
        }
    }
`;


export const FIND_QUIZ_BY_ID = gql`
    query findQuizById($id: ID!) {
        findQuizById(id: $id) {
            _id
            title
            description
            titleImg
            creator
            platformId
            quizHits
            quizLikes
            quizDislikes
            badges{
                rank
                image
            }
            scores{
                user
                userScore
                bestScore
                liked
            }
            cards{
                cardNum
                question
                choices
                answer
                answerExplanation
                questionImg
                answerImg
                drawing
                drawing2
            }
            createdAt
        }
    }
`;

export const GET_RANDOM_QUIZ = gql`
    query getRandomQuiz {
        getRandomQuiz
    }
`;

export const GET_QUIZ_HITS = gql`
    query getQuizHits($ids: [ID!]!) {
        getQuizHits(ids: $ids)
    }
`;

export const FETCH_POPULAR_QUIIZZES = gql`
    query getPopularQuizzes {
        getPopularQuizzes {
            _id
            title
            titleImg
            creator
            quizHits
            quizLikes
        }
    }
`;

export const GET_POPULAR_QUIIZZES_OF_ID = gql`
    query getPopularQuizzesOfId($id: ID!) {
        getPopularQuizzesOfId(id: $id) {
            _id
            title
            titleImg
            creator
            quizHits
            quizLikes
        }
    }
`;

export const GET_FOR_YOU_QUIZZES = gql`
    query getForYouQuizzes($id: ID!) {
        getForYouQuizzes(id: $id) {
            _id
            title
            titleImg
            creator
            platformId
            quizHits
            quizLikes
        }
    }
`;

export const FIND_COLLABORATORS_BY_IDS = gql`
    query findCollaboratorsByIds($ids: [ID!]!) {
        findCollaboratorsByIds(ids: $ids) {
            _id
            username
            email
            profileId
            # quests {
            #     _id
            #     isCompleted
            #     image
            # }
            createdAt
        }
    }
`;

export const FIND_QUIZ_COLLECTION_BY_ID = gql`
    query findQuizCollectionById($id: ID!) {
        findQuizCollectionById(id: $id) {
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

export const FIND_QUIZ_COLLECTION_BY_IDS = gql`
    query findQuizCollectionByIds($ids: [ID!]!) {
        findQuizCollectionByIds(ids: $ids) {
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

export const GET_POPULAR_QUIZ_COLLECTIONS_OF_ID = gql`
    query getPopularQuizCollectionsOfId($id: ID!) {
        getPopularQuizCollectionsOfId(id: $id) {
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

export const GET_SEARCH_RESULTS = gql`
    query getSearchResults($searchQuery: String!, $filters: [String]!) {
        getSearchResults(searchQuery: $searchQuery, filters: $filters) {
            __typename
            ... on User {
                _id
                username
                profileId
            }
            
            ... on Platform {
                _id
                name
                platformImg
                followerCount
            }

            ... on Quiz {
                _id
                creator
                title
                description
                quizHits
            }

            ... on QuizCollection {
                _id
                creator
                name
                description
                quizzes
            }
        }
    }
`;

export const FIND_BADGES_BY_IDS = gql`
    query findBadgesByIds($ids: [ID!]!) {
        findBadgesByIds(ids: $ids) {
            _id
            quiz
            rank
            image
            description
        }
    }
`;

export const FIND_DRAWINGS_BY_IDS = gql`
    query Query($ids: [ID!]) {
        findDrawingsByIds(ids: $ids) {
            _id
            img
            pos
            rot
            size
        }
    }
`