const ObjectId = require('mongoose').Types.ObjectId;

const Quiz = require('../../models/Quiz');
const User = require('../../models/User');

module.exports = {
    Query: {

        async getQuizzes(){
            const quizzes = await Quiz.find();

            if (quizzes) return quizzes;
            return [];
        },
        async getQuizById (_, { id }){
            const quiz= await Quiz.findOne({_id: id});
            console.log(quiz);
            if (quiz) return quiz;
            return{};
        },
        async getQuizzesByIds(_, { ids }){
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
        async createQuiz(_, { owner, tempquiz }) {
        
            const ownerId = new ObjectId(owner);
            const user = await User.findOne({_id: ownerId});
      
            const newQuiz = new Quiz({
              _id:  new ObjectId(),
                title: tempquiz.title,
                description: tempquiz.description,
                titleImg: tempquiz.titleImg,  
                creator: user._id,
                platformId: tempquiz.platformId,
                quizHits: 0,
                quizLikes: 0,
                quizDislikes: 0,
                badges: tempquiz.badges,
                scores: [],
                cards: tempquiz.cards,
                createdAt: new Date().toISOString()
            });
      
            const updated = await newQuiz.save();
      
            if(updated) {
              console.log(newQuiz);
              return newQuiz;
            }
            else return false;
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
        const deletedQuiz = await Quiz.findOneAndDelete({_id: new ObjectId(id)}, function(err, docs){
            if(err){
                return false;
            }else{
                return true;
            }
        });

        //deletedQuiz.remove()
        return deletedQuiz;

      },

    },
  };