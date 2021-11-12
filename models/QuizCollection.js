const { model, Schema, ObjectId } = require('mongoose');

const quizCollectionSchema = new Schema({
    _id: ObjectId,
	name: String,
	creator: ObjectId,
	img: String,
	description: String,
	quizzes: [ObjectId],
	createdAt: String,
});

const QuizCollection = model('QuizCollection', quizCollectionSchema);
module.exports = QuizCollection;