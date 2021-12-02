const usersResolvers = require('./users');
const profilesResolvers = require('./profiles');
const platformsResolvers = require('./platforms');
const quizzesResolvers = require('./quiz');
const quizCollectionsResolvers = require('./quizCollections');
const searchResolvers = require('./search');
const badgesResolvers = require('./badges');
const drawingsResolvers = require('./drawings');

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
    SearchResults: {
        __resolveType(obj) {
            if (obj.username){
                return 'User';
            }
            if (obj.owner){
                return 'Platform';
            }
            if (obj.title){
                return 'Quiz';
            }
            if (obj.creator){
                return 'QuizCollection';
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
        ...searchResolvers.Query,
        ...badgesResolvers.Query,
        ...drawingsResolvers.Query

    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...profilesResolvers.Mutation,
        ...platformsResolvers.Mutation,
        ...quizzesResolvers.Mutation,
        ...quizCollectionsResolvers.Mutation,
        ...searchResolvers.Mutation,
        ...badgesResolvers.Mutation,
        ...drawingsResolvers.Mutation
    }
}
