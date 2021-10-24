const { model, Schema, ObjectId } = require('mongoose');
const Collection = require('./Collection').schema;
const Image = require('./Image').schema;
const Quiz = require('./Quiz').schema;
const User = require('./User').schema;

const platformSchema = new Schema({
    id: ObjectId,
	owner: User,
    platformImg: Image,
    bannerImg: Image,
    description: String,
    contact: String,
    collaborators: [User],
    requests: [User],
    followerCount: Number,
    quizzes: [Quiz],
    collections: [Collection],
    createdAt: String
});
    
const Platform = model('Platform', platformSchema);
module.exports = Platform;