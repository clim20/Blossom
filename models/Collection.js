const { model, Schema, ObjectId } = require('mongoose');
const Image = require('./Image').schema;
const Quiz = require('./Quiz').schema;
const User = require('./User').schema;

const collectionSchema = new Schema({
    id: ObjectId,
	creator: User, 
	img: Image,
	description: String,
	quizzes: [Quiz],
	createdAt: String
});

const Collection = model('Collection', collectionSchema);
module.exports = Collection;