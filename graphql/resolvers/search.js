const User = require('../../models/User');
const Platform = require('../../models/Platform');
const Quiz = require('../../models/Quiz');
const QuizCollection = require('../../models/QuizCollection');

module.exports = {
  Query: {
    async getSearchResults(_, { searchQuery, filters }) {
        const users = await User.find({username: new RegExp(searchQuery, 'i')}).sort({ _id: 1 }).limit(20);
        const platforms = await Platform.find({name: new RegExp(searchQuery, 'i')}).sort({ _id: 1 }).limit(20);
        const quizzes = await Quiz.find({title: new RegExp(searchQuery, 'i')}).sort({ _id: 1 }).limit(20);
        const quizCollections = await QuizCollection.find({name: new RegExp(searchQuery, 'i')}).sort({ _id: 1 }).limit(20);

        var results = [];
        if (filters.includes("Users")) {
            results = [...results, ...users];
        }
        
        if (filters.includes("Platforms")) {
            results = [...results, ...platforms];
        }
        
        if (filters.includes("Quizzes")) {
            results = [...results, ...quizzes];           
        } 
        
        if (filters.includes("Quiz Collections")) {
            results = [...results, ...quizCollections];
        } 
        
        if (filters.length == 0) {
            results = [...users, ...platforms, ...quizzes, ...quizCollections].reverse().slice(0, 20);
        }
        
        if (results) return results;
        return [];
    },
  },
  Mutation: {

  },
};