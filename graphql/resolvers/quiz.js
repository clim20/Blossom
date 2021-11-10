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
        async findQuizById (_, { id }){
            const quiz= await Quiz.findOne({_id: id});
            console.log(quiz);
            if (quiz) return quiz;
            return{};
        },
        async findQuizzesByIds(_, { ids }){
            var quizzes = [];
            for(let i = 0; i < ids.length; i++){
                const quiz = await Quiz.findOne({_id: ids[i]});
                if (quiz) {
                    quizzes.push(quiz);
                }
            }
            if (quizzes) return quizzes;
            return [];
        },
        async getQuizHits(_, { ids }){
          var quizHits = 0;
          for(let i = 0; i < ids.length; i++){
              const quiz = await Quiz.findOne({_id: ids[i]});
              if (quiz) {
                  quizHits += quiz.quizHits;
              }
          }
          return quizHits;
        },
        async getPopularQuizzes() {
            const quizzes = await Quiz.find().sort({ quizLikes: -1 });
          
            var res = [];
            for(let i = 0; i < 5; i++) {
              if (quizzes[i]) {
                res.push(quizzes[i]);
              }
            }
    
            if (res) return res;
            return [];
        },
    },
    Mutation: {
      async createQuiz(_, { owner, title }) {
          //console.log("here")
          const ownerId = new ObjectId(owner);
          const user = await User.findOne({_id: ownerId});
          
          const retQuiz = new Quiz({
            
              _id:  new ObjectId(),
              title: title,
              description: "Add Description Here",
              titleImg: "",  
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
                  drawing: null
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
      async updateQuiz(_, { id, updatedQuiz }) {
        const quiz = await Quiz.findOne({_id: new ObjectId(id)});
  
        const updated = await Quiz.updateOne({_id: new ObjectId(id)}, {

            title: updatedQuiz.title,
            description: updatedQuiz.description,
            titleImg: updatedQuiz.titleImg,  
            platformId: updatedQuiz.platformId,
            quizHits: updatedQuiz.quizHits,
            quizLikes: updatedQuiz.quizLikes,
            quizDislikes: updatedQuiz.quizDislikes,
            badges: updatedQuiz.badges,
            scores: updatedQuiz.scores,
            cards: updatedQuiz.cards,
        });
  
        if (updated) return quiz;
        return quiz;
      },

      async deleteQuiz(_, { id }){
        const deletedQuiz = await Quiz.findOne({_id: new ObjectId(id)});
        /*
        if(deletedQuiz){
          const creator = deletedQuiz.creator;
  
          let profile = await Profile.findOne({user: creator})
          let profileQuiz = profile.quizzes.filter(deletedQuiz => deletedQuiz._id.toString() !== id.toString());
          let updated = await Profile.updateOne({user: profile.user}, {quizzes: profileQuiz});
            
        }
        */

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