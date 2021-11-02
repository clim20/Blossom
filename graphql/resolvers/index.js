const usersResolvers = require('./users');
const profilesResolvers = require('./profiles');
const platformsResolvers = require('./platforms');
const updateResolvers = require('./update');

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
        ...updateResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...profilesResolvers.Mutation,
        ...platformsResolvers.Mutation,
        ...updateResolvers.Mutation
    }
}