const usersResolvers = require('./users');
const profilesResolvers = require('./profiles');
const platformsResolvers = require('./platforms');
const quizzesResolvers = require('./quiz');
const quizCollectionsResolvers = require('./quizCollections');

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
        ...quizzesResolvers.Query,
        ...quizCollectionsResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...profilesResolvers.Mutation,
        ...platformsResolvers.Mutation,
        ...quizzesResolvers.Mutation,
        ...quizCollectionsResolvers.Mutation
    }
}
