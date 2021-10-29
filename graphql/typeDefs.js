const { gql } = require('apollo-server');

module.exports = gql`
    # TODO: add ! back to profileId and id!
    type User {
        id: ID
        username: String!
        email: String!
        profileId: String!
        quests: [Quest]
        token: String!
        createdAt: String!
    }

    type Quest {
        questId: ID!
        isCompleted: Boolean!
        image: Image!
    }

    type Profile {
        id: ID!
        user: User!
        profileImg: Image
        bannerImg: Image
        badges: [Badge]
        description: String
        contact: String
        followerCount: Int!
        usersFollowing: [User]
        platformsFollowing: [Platform]
        quizzes: [Quiz]
        collections: [Collection]
        platforms: [Platform]
    }

    type Platform {
        id: ID!
        name: String!
        owner: User!
        platformImg: Image
        bannerImg: Image
        description: String
        contact: String
        collaborators: [User!]!
        requests: [User]
        followerCount: Int!
        quizzes: [Quiz]
        collections: [Collection]
        createdAt: String!
    }

    type Quiz {
        id: ID!
        title: String!
        description: String!
        titleImg: Image
        creator: User!
        platform: Platform
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
        image: Image
    }

    type Score {
        user: User!
        userScore: Int!
        bestScore: Int!
    }

    type Card {
        cardNum: Int!
        question: String!
        choices: [String!]!
        answer: Int!
        answerExplanation: String!
        questionImg: Image
        answerImg: Image
        drawing: Drawing
    }

    type Collection {
        id: ID!
        creator: User!
        img: Image
        description: String
        quizzes: [Quiz]
        createdAt: String!
    }

    type Image {
        id: ID!
    }

    type Drawing {
        id: ID!
    }

    type Badge {
        id: ID!
        quiz: Quiz!
        rank: Int!
        image: Image!
    }

    type Query {
        getPopularUsers: [User!]!
        findUserById(id: ID!): User!
        getProfiles: [Profile!]!
        findProfileById(id: ID!): Profile!
        getPopularPlatforms: [Platform!]!
        getPlatforms: [Platform!]!
        findPlatformById(id: ID!): Platform!
    }

    type Mutation {
        login(username: String!, email: String!): User!
        updateScore(id: ID!, score: Int!): User!
        createPlatform(owner: String!, name: String!): Platform! 
    }
`