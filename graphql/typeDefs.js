const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        scores: [Int!]!
        token: String!
        createdAt: String!
    }

    type Query {
        getUsers: [User]
        findUserById(id: ID!): User!
    }

    type Mutation {
        login(username: String!, email: String!): User!
        updateScore(id: ID!, score: Int!): User!
    }
`