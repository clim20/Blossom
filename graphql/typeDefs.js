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
        image: Image!
    }

    type Profile {
        _id: ID!
        user: ID!
        profileImg: Image
        bannerImg: Image
        badges: [ID!]
        description: String
        contact: String
        followerCount: Int!
        usersFollowing: [ID!]
        platformsFollowing: [ID!]
        quizzes: [ID!]
        collections: [ID!]
        platforms: [ID!]
    }

    type Platform {
        _id: ID!
        name: String!
        owner: ID!
        platformImg: Image
        bannerImg: Image
        description: String
        contact: String
        collaborators: [ID!]!
        requests: [ID!]
        followerCount: Int!
        quizzes: [ID!]
        collections: [ID!]
        createdAt: String!
    }

    type Quiz {
        _id: ID!
        title: String!
        description: String!
        titleImg: Image
        creator: ID!
        platform: ID!
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
        questionImg: Image
        answerImg: Image
        drawing: Drawing
    }

    type Collection {
        _id: ID!
        creator: ID!
        img: Image
        description: String
        quizzes: [ID!]
        createdAt: String!
    }

    type Image {
        _id: ID!
    }

    type Drawing {
        _id: ID!
    }

    type Badge {
        _id: ID!
        quiz: ID!
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
        findPlatformsByIds(ids: [ID!]!): [Platform!]!
        getUsers: [User!]!
    }

    type Mutation {
        login(username: String!, email: String!): User!
        createPlatform(owner: ID!, name: String!): Platform! 
        updateUsername(id: ID!, name: String!): User!
    }
`