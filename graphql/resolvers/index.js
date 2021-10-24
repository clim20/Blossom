const usersResolvers = require('./users');
const profilesResolvers = require('./profiles');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...profilesResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...profilesResolvers.Mutation
    }
}