const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        profileId: ID!
        quests: [Quest]
        token: String!
        createdAt: String!
    }

    type Quest {
        _id: ID!
        isCompleted: Boolean!
        image: String!
    }

    type Profile {
        _id: ID!
        user: ID!
        profileImg: String
        bannerImg: String
        badges: [ID!]
        description: String
        contact: String
        followerCount: Int!
        following: [ID!]
        featuredQuiz: ID
        quizzes: [ID!]
        quizCollections: [ID!]
        platforms: [ID!]
    }

    type Platform {
        _id: ID!
        name: String!
        owner: ID!
        platformImg: String
        bannerImg: String
        description: String
        contact: String
        collaborators: [ID!]!
        requests: [ID!]
        followerCount: Int!
        featuredQuiz: ID
        quizzes: [ID!]
        quizCollections: [ID!]
        createdAt: String!
    }

    type Quiz {
        _id: ID!
        title: String!
        description: String
        titleImg: String
        creator: ID!
        platformId: ID
        quizHits: Int!
        quizLikes: Int!
        quizDislikes: Int!
        badges: [quizBadge],
        scores: [Score],
        cards: [Card],
        createdAt: String!
    }

    type quizBadge {
        rank: Int
        image: String
    }

    type Score {
        user: ID!
        userScore: Int!
        bestScore: Int!
    }

    type Card {
        cardNum: Int!
        question: String!
        choices: [String!]!
        answer: Int!
        answerExplanation: String!
        questionImg: String
        answerImg: String
        drawing: Drawing
    }

    type QuizCollection {
        _id: ID!
        name: String!
        creator: ID!
        img: String
        description: String
        quizzes: [ID!]
        createdAt: String!
    }

    type Drawing {
        _id: ID!
    }

    type Badge {
        _id: ID!
        quiz: ID!
        rank: Int!
        image: String!
    }

    input ProfileInput {
        profileImg: String
        bannerImg: String
        description: String
        contact: String
        # following: [ID!]
    }

    input PlatformInput {
        platformImg: String
        bannerImg: String
        description: String
        contact: String
    }

    input QuizCollectionInput {
        img: String
        name: String
        description: String
        quizzes: [ID]
    }

    input QuizInput {
        _id: ID!
        title: String!
        description: String
        titleImg: String
        creator: ID!
        platformId: ID
        quizHits: Int!
        quizLikes: Int!
        quizDislikes: Int!
        badges: [BadgeInput],
        scores: [ScoreInput],
        cards: [CardInput!]!,
        createdAt: String!
    }

    input CardInput{
        cardNum: Int!,
        question: String!,
        choices: [String!]!,
        answer: Int!,
        answerExplanation: String!,
        questionImg: String,
        answerImg: String,
        drawing: ID
    }

    input BadgeInput{
        rank: Int,
        image: String
    }

    input ScoreInput{
        user: ID,
        userScore: Int,
        bestScore: Int
    }

    
    union Following = User | Platform
    union SearchResults = User | Platform | Quiz | QuizCollection

    type Query {
        getUsers: [User!]!
        findUserById(id: ID!): User!
        getPopularUsers: [User!]!

        getProfiles: [Profile!]!
        findProfileById(id: ID!): Profile!

        findFollowingByIds(ids: [ID!]!): [Following!]!

        getPlatforms: [Platform!]!
        findPlatformById(id: ID!): Platform!
        findPlatformsByIds(ids: [ID!]!): [Platform!]!
        getPopularPlatforms: [Platform!]!

        findCollaboratorsByIds(ids: [ID!]!): [User!]!
        
        getQuizzes: [Quiz!]!
        findQuizById(id: ID!): Quiz!
        findQuizzesByIds(ids: [ID!]!): [Quiz!]!
        getQuizHits(ids: [ID!]!): Int!
        getPopularQuizzes: [Quiz!]!
        getPopularQuizzesOfId(id: ID!): [Quiz]!
        getRandomQuiz: ID!

        getQuizCollections: [QuizCollection!]!
        findQuizCollectionById(id: ID!): QuizCollection!
        findQuizCollectionByIds(ids: [ID!]!): [QuizCollection!]!
        getPopularQuizCollectionsOfId(id: ID!): [QuizCollection]!

        getSearchResults(searchQuery: String!, filters: [String]!): [SearchResults!]!
    }

    type Mutation {
        login(username: String!, email: String!, profileImg: String!): User!
        updateUsername(id: ID!, name: String!): User!

        followProfile(userId: ID!, profileId: ID!): Boolean!
        followPlatform(userId: ID!, platformId: ID!): Boolean!

        createPlatform(owner: ID!, name: String!): Platform! 
        deletePlatform(platformId: ID!): Boolean! 
        addCollaboratorRequest(platformId: ID!, userId: ID!): Platform!
        addCollaborator(platformId: ID!, userId: ID!): Platform!
        removeCollaboratorRequest(platformId: ID!, userId: ID!): Platform!
        removeCollaborator(platformId: ID!, userId: ID!): Platform!

        editProfile(id: ID!, updatedProfile: ProfileInput!): Profile!
        editPlatform(id: ID!, updatedPlatform: PlatformInput!): Platform!
        setFeaturedQuiz(profilePlatformId: ID!, quizId: ID!): Quiz!

        createQuiz(owner: ID!, title: String!): Quiz
        updateQuiz(quizId: ID!, updatedQuiz: QuizInput!): Quiz
        deleteQuiz(id: ID!): Boolean!

        createQuizCollection(owner: ID!, name: String!): QuizCollection!
        deleteQuizCollection(quizCollectionId: ID!): Boolean! 
        addQuizCollection(platformId: ID!, quizCollectionId: ID!): Platform!
        removeQuizCollection(platformId: ID!, quizCollectionId: ID!): Boolean!
        addQuizToQuizCollection(quizId: ID!, quizCollectionId: ID!): QuizCollection!
        removeQuizFromQuizCollection(quizId: ID!, quizCollectionId: ID!): Boolean!
        editQuizCollection(id: ID!, updatedQuizCollection: QuizCollectionInput!): QuizCollection!
    }
`