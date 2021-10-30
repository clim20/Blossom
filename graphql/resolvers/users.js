const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    profileId: user.profileId,
    quests: user.quests,
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Query: {
    async getPopularUsers() {
      const profiles = await Profile.find().sort({ followerCount: -1 });

      var users = [];
      for(let i = 0; i < 5; i++) {
        if (profiles[i]) {
          var userObject = await User.findOne({_id: profiles[i].user});

          if(userObject)
            users.push(userObject);
        }
      }

      if (users) return users;
      return [];
    },
    async findUserById(_, { id }) {
      const user = await User.findById(new ObjectId(id));

      if (user) return user;
      return {};
    }
  },
  Mutation: {
    async login(_, { username, email }) {
      const user = await User.findOne({ email });

      // If user not found, register user
      if (!user) {
        const profileId = new ObjectId();
        const newUser = new User({
          id: new ObjectId(),
          email,
          username,
          profileId: profileId,
          quests: [],
          createdAt: new Date().toISOString()
        });

        const newProfile = new Profile({
          id: profileId,
          user: newUser,
          profileImg: {},
          bannerImg: {},
          badges: [],
          description: "",
          contact: "",
          followerCount: 0,
          usersFollowing: [],
          platformsFollowing: [],
          quizzes: [],
          collections: [],
          platforms: []
        });

        await newProfile.save();
        const res = await newUser.save();

        // Create an auth token
        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token
        }
      }

      // Create an auth token
      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async updateScore(_, { id, score }) {
      let user = await User.findById(new ObjectId(id));

      if (!user) {
        return {};
      }

      const updatedScores = [...user.scores, score];
      await User.updateOne({ _id: id }, { scores: updatedScores });
      user = await User.findById(new ObjectId(id));

      return user;
    }
  },
};