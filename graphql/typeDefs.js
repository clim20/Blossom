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

    input RegisterInput {
        username: String!
        email: String!
    }

    type Query {
        findUserById(id: ID!): User!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, email: String!): User!
        updateScore(id: ID!, score: Int!): User!
    }
`