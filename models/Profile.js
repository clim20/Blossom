const { model, Schema, ObjectId } = require('mongoose');

const profileSchema = new Schema({
    _id: ObjectId,
	user: ObjectId,
	profileImg: String,
	bannerImg: String,
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