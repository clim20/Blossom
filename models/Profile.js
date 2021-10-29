const { model, Schema, ObjectId } = require('mongoose');
const Badge = require('./Badge').schema;
const Collection = require('./Collection').schema;
const Image = require('./Image').schema;
const Platform = require('./Platform').schema;
const Quiz = require('./Quiz').schema;
const User = require('./User').schema;

const profileSchema = new Schema({
    id: ObjectId,
	user: User,
	profileImg: Image,
	bannerImg: Image,
    badges: [Badge],
    description: String,
    contact: String,
    followerCount: Number,
    usersFollowing: [User],
    platformsFollowing: [Platform],
    quizzes: [Quiz],
    collections: [Collection],
    platforms: [Platform]
});

const Profile = model('Profile', profileSchema);
module.exports = Profile;