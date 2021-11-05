const usersResolvers = require('./users');
const profilesResolvers = require('./profiles');
const platformsResolvers = require('./platforms');
const quizResolvers = require('./quiz')

module.exports = {
    Following: {
        __resolveType(obj) {
            if (obj.username){
            return 'User';
            }
            if (obj.name){
            return 'Platform';
            }
            return null;
        },
    },
    Query: {
        ...usersResolvers.Query,
        ...profilesResolvers.Query,
        ...platformsResolvers.Query,
        ...quizResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...profilesResolvers.Mutation,
        ...platformsResolvers.Mutation,
        ...quizResolvers.Mutation
    }
}
