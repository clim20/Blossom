const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

function generateToken(user) {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    username: user.username,
    profileId: user.profileId,
    quests: user.quests,
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Query: {
    async getUsers() {
      const users = await User.find();

      if (users) return users;
      return [];
    },
    async getPopularUsers() {
      const profiles = await Profile.find().sort({ followerCount: -1 }).limit(4);

      var users = [];
      for(let i = 0; i < profiles.length; i++) {
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
    async login(_, { username, email, profileImg }) {
      const user = await User.findOne({ email });

      // If user not found, register user
      if (!user) {
        const profileId = new ObjectId();
        const newUser = new User({
          _id: new ObjectId(),
          email,
          username,
          profileId: profileId,
          quests: [],
          createdAt: new Date().toISOString()
        });

        const newProfile = new Profile({
          _id: profileId,
          user: newUser._id,
          profileImg: profileImg,
          bannerImg: "https://wallpaperaccess.com/full/5163061.jpg",
          badges: [],
          description: "",
          contact: "",
          followerCount: 0,
          following: [],
          featuredQuiz: null,
          quizzes: [],
          quizCollections: [],
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
    async updateUsername(_, { id, name }){
      const user = await User.findOne({_id: id});
      const usernameExist = await User.findOne({username: name});

      if(!usernameExist){
          const updated = await User.updateOne({_id: id}, {username: name});

          if (updated) {
              const newUser = await User.findOne({_id: user._id});
              return newUser;
          }
      }
      return user;
    }
  },
};