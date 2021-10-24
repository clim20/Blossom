const { model, Schema, ObjectId } = require('mongoose');
const Drawing = require('./Drawing').schema;
const Image = require('./Image').schema;
const Platform = require('./Platform').schema;
const User = require('./User').schema;

const quizSchema = new Schema({
    id: ObjectId,
	title: String,
    description: String,
    titleImg: Image,  
    creator: User,
    platform: Platform,
    quizHits: Number,
    quizLikes: Number,
    quizDislikes: Number,
    badges: [
        {
            rank: Number,
            image: Image
        }
    ],
    scores: [
        {
            user: User,
            userScore: Number,
            bestScore: Number,
        }
    ],
    cards: [
        {
            cardNum: Number,
            question: String,
            choices: [String],
            answer: Number,
            answerExplanation: String,
            questionImg: Image,
            answerImg: Image,
            drawing: Drawing
        }
    ],
    createdAt: String
});

const Quiz = model('Quiz', quizSchema);
module.exports = Quiz;