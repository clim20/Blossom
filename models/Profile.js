const { model, Schema, ObjectId } = require('mongoose');
const Badge = require('./Badge').schema;
const Collection = require('./Collection').schema;
const Image = require('./Image').schema;
const Platform = require('./Platform').schema;
const Quiz = require('./Quiz').schema;
const User = require('./User').schema;

const profileSchema = new Schema({
    id: ObjectId,
	user: ObjectId,
	profileImg: Image,
	bannerImg: Image,
    badges: [ObjectId],
    description: String,
    contact: String,
    followerCount: Number,
    usersFollowing: [ObjectId],
    platformsFollowing: [ObjectId],
    quizzes: [ObjectId],
    collections: [ObjectId],
    platforms: [ObjectId]
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;