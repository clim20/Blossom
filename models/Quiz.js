const { model, Schema, ObjectId } = require('mongoose');

const quizSchema = new Schema({
    _id: ObjectId,
	title: String,
    description: String,
    titleImg: String,  
    creator: ObjectId,
    platformId: String,
    quizHits: Number,
    quizLikes: Number,
    quizDislikes: Number,
    badges: [
        {
            rank: Number,
            image: String
        }
    ],
    scores: [
        {
            user: ObjectId,
            userScore: Number,
            bestScore: Number,
            liked: Number,
        }
    ],
    cards: [
        {
            cardNum: Number,
            question: String,
            choices: [String],
            answer: Number,
            answerExplanation: String,
            questionImg: String,
            answerImg: String,
            drawing: [ObjectId],
            drawing2: [ObjectId]
        }
    ],
    createdAt: String
});

const Quiz = model('Quiz', quizSchema);
module.exports = Quiz;