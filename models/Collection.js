const { model, Schema, ObjectId } = require('mongoose');
const Image = require('./Image').schema;

const collectionSchema = new Schema({
    _id: ObjectId,
	creator: ObjectId, 
	img: Image,
	description: String,
	quizzes: [ObjectId],
	createdAt: String
});

const Collection = model('Collection', collectionSchema);
module.exports = Collection;