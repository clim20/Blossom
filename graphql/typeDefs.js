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
        quizzes: [ID!]
        collections: [ID!]
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
        quizzes: [ID!]
        collections: [ID!]
        createdAt: String!
    }

    type Quiz {
        _id: ID!
        title: String!
        description: String!
        titleImg: String
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

    type Collection {
        _id: ID!
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

    union Following = User | Platform

    type Query {
        getPopularUsers: [User!]!
        findUserById(id: ID!): User!
        getProfiles: [Profile!]!
        findProfileById(id: ID!): Profile!
        findFollowingByIds(ids: [ID!]!): [Following!]!
        getPopularPlatforms: [Platform!]!
        getPlatforms: [Platform!]!
        findPlatformById(id: ID!): Platform!
        findPlatformsByIds(ids: [ID!]!): [Platform!]!
        getUsers: [User!]!
    }

    type Mutation {
        login(username: String!, email: String!, profileImg: String!): User!
        followProfile(userId: ID!, profileId: ID!): Boolean!
        followPlatform(userId: ID!, platformId: ID!): Boolean!
        createPlatform(owner: ID!, name: String!): Platform! 
        updateUsername(id: ID!, name: String!): User!
    }
`