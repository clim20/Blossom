const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    score: user.score
  }, SECRET_KEY, { expiresIn: '1h' })
}

module.exports = {
  Query: {
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
        const newUser = new User({
          email,
          username,
          score: [],
          createdAt: new Date().toISOString()
        });

        const res = await newUser.save();

        // Create an auth token
        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token
        }
      }

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
