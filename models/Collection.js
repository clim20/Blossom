const { model, Schema, ObjectId } = require('mongoose');

const collectionSchema = new Schema({
    _id: ObjectId,
	creator: ObjectId, 
	img: String,
	description: String,
	quizzes: [ObjectId],
	createdAt: String
});

const Collection = model('Collection', collectionSchema);
module.exports = Collection;