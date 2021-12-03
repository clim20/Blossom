const ObjectId = require('mongoose').Types.ObjectId;

const Quiz = require('../../models/Quiz');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Platform = require('../../models/Platform');

module.exports = {
  Query: {
    async getQuizzes(){
      const quizzes = await Quiz.find();

      if (quizzes) return quizzes;
      return [];
    },
    async getPopularQuizzes() {
      const quizzes = await Quiz.find().sort({ quizHits: -1 }).limit(4);
      
      if (quizzes) return quizzes;
      return [];
    },
    async getPopularQuizzesOfId(_, { id }) {
      const profile = await Profile.findOne({_id: new ObjectId(id)});
      const platform = await Platform.findOne({_id: new ObjectId(id)});

      const quizIds = profile ? profile.quizzes : platform ? platform.quizzes : [];

      var quizzes = [];
      for (let i = 0; i < quizIds.length; i++) {
        const quiz = await Quiz.findOne({_id: quizIds[i]});
        if (quiz) {
          quizzes.push(quiz);
        }
      }

      quizzes = quizzes.sort((a, b) => {b.quizHits - a.quizHits}).slice(0, 3);
      
      if (quizzes) return quizzes;
      return [];
    },
    async getForYouQuizzes(_, { id }) {
      const profile = await Profile.findOne({_id: new ObjectId(id)});

      const followingIds = profile ? profile.following : [];

      var quizIds = [];
      for (let i = 0; i < followingIds.length; i++) {
        const user = await User.findOne({_id: followingIds[i]});
        if (user) {
          const userProfile = await Profile.findOne({_id: user.profileId});
          if (userProfile) {
            quizIds = [...quizIds, ...userProfile.quizzes];
          }
        }
      }

      var quizzes = [];
      for (let i = 0; i < quizIds.length; i++) {
        const quiz = await Quiz.findOne({_id: quizIds[i]});
        if (quiz) {
          quizzes.push(quiz);
        }
      }

      quizzes = quizzes.sort().reverse().slice(0, 4);
      
      if (quizzes) return quizzes;
      return [];
    },
    async findQuizById (_, { id }) {
      const quiz = await Quiz.findOne({_id: id});
      if (quiz) return quiz;
      return {};
    },
    async findQuizzesByIds(_, { ids }) {
      var quizzes = [];
      for (let i = 0; i < ids.length; i++) {
          const quiz = await Quiz.findOne({_id: ids[i]});
          if (quiz) {
              quizzes.push(quiz);
          }
      }
      if (quizzes) return quizzes;
      return [];
    },
    async getQuizHits(_, { ids }) {
      var quizHits = 0;
      for (let i = 0; i < ids.length; i++) {
        const quiz = await Quiz.findOne({_id: ids[i]});
        if (quiz) {
            quizHits += quiz.quizHits;
        }
      }
      return quizHits;
    },
    async getRandomQuiz() {
      const quizzes = await Quiz.find();
      const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

      if (quiz) return quiz._id;
      return quiz._id;
    }
  },
  Mutation: {
    async createQuiz(_, { owner, title }) {
      const ownerId = new ObjectId(owner);
      const user = await User.findOne({_id: ownerId});
      
      const retQuiz = new Quiz({
        _id:  new ObjectId(),
        title: title,
        description: "Add Description Here",
        titleImg: "https://d3ftabzjnxfdg6.cloudfront.net/app/uploads/2021/02/19-07-13_8644-BB-web-1024x585.jpg",  
        creator: user._id,
        platformId: null,
        quizHits: 0,
        quizLikes: 0,
        quizDislikes: 0,
        badges: [],
        scores: [],
        cards: [
          {
            cardNum: 0,
            question: "Enter Question Here",
            choices: ["Enter Choices Here"],
            answer: 0,
            answerExplanation: "Enter Explenation Here",
            questionImg: "",
            answerImg: "",
            drawing: [],
            drawing2: []
          }
        ],
        createdAt: new Date().toISOString()
      });
  
      const updated = await retQuiz.save();

      const profile = await Profile.findOne({_id: new ObjectId(user.profileId)});
      let quizzes = profile.quizzes;
      quizzes.push(retQuiz._id);
      const updated2 = await Profile.updateOne({_id: profile._id}, {quizzes: quizzes});

      if(updated && updated2) {
        return retQuiz;
      }else{

        return null;
      }
    },
    async updateQuiz(_, { quizId, updatedQuiz }) {
      const quiz = await Quiz.findOne({_id: new ObjectId(quizId)});

      const updated = await Quiz.updateOne({_id: new ObjectId(quizId)}, {
        title: updatedQuiz.title,
        description: updatedQuiz.description,
        titleImg: updatedQuiz.titleImg,  
        platformId: updatedQuiz.platformId,
        quizHits: updatedQuiz.quizHits,
        quizLikes: updatedQuiz.quizLikes,
        quizDislikes: updatedQuiz.quizDislikes,
        //badges: updatedQuiz.badges,
        scores: updatedQuiz.scores,
        cards: updatedQuiz.cards,
      });
      // console.log("-------")
      // console.log(quiz)
      // console.log("======")
      // console.log(updated)
      if (updated) {
        return quiz;
      }else{
        return null;
      }
    },
    async deleteQuiz(_, { id }){
      /* TODO: Quiz need to be removed from the collections that have them and their badges need to be deleted too*/
      const deletedQuiz = await Quiz.findOne({_id: new ObjectId(id)});
      
      if(deletedQuiz){
        // console.log("deletedQuiz")
        const creator = deletedQuiz.creator;

        let profile = await Profile.findOne({user: creator})
        let profileQuiz = profile.quizzes.filter(quizId => deletedQuiz._id.toString() !== quizId.toString());
        
        let updated = await Profile.updateOne({user: profile.user}, {quizzes: profileQuiz});   
      }
      const deleted = await Quiz.deleteOne({_id: id});

      if (deleted){
        return true;
      }
      return false;
    },
    async setFeaturedQuiz(_, { profilePlatformId, quizId }) {
      const profile = await Profile.findOne({_id: new ObjectId(profilePlatformId)});
      const platform = await Platform.findOne({_id: new ObjectId(profilePlatformId)});
      const quiz = await Quiz.findOne({_id: new ObjectId(quizId)});

      var updated;
      if (profile) {
        updated = await Profile.updateOne({_id: new ObjectId(profilePlatformId)}, {
          featuredQuiz: quizId
        });
      }

      if (platform) {
        platform = await Platform.updateOne({_id: new ObjectId(profilePlatformId)}, {
          featuredQuiz: quizId
        });
      }

      if (updated) return quiz;
      return quiz;
    }
  },
};