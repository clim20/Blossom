const { model, Schema, ObjectId } = require('mongoose');
const Collection = require('./Collection').schema;
const Image = require('./Image').schema;
const Quiz = require('./Quiz').schema;
const User = require('./User').schema;

const platformSchema = new Schema({
    id: ObjectId,
    name: String,
	owner: ObjectId,
    platformImg: Image,
    bannerImg: Image,
    description: String,
    contact: String,
    collaborators: [ObjectId],
    requests: [ObjectId],
    followerCount: Number,
    quizzes: [ObjectId],
    collections: [ObjectId],
    createdAt: String
});
    
const Platform = model('Platform', platformSchema);
module.exports = Platform;