const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../../models/User');

module.exports = {
    Query: {
        async getUsers() {
            const users = await User.find();

            if (users) return users;
            return [];
        }
    },
    Mutation: {
        async updateUsername(_, { id, name }){
            const user = await User.findOne({_id: id});
            const usernameExist = await User.findOne({username: name});

            if(!usernameExist){
                const updated = await User.updateOne({id: user._id}, {username: name});

                if (updated) {
                    const newUser = await User.findOne({_id: id});
                    return newUser;
                }
            }
            return user;
        }
    },
};