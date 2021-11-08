const { model, Schema, ObjectId } = require('mongoose');

const platformSchema = new Schema({
    _id: ObjectId,
    name: String,
	owner: ObjectId,
    platformImg: String,
    bannerImg: String,
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