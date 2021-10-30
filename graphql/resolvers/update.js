const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../../models/User');

module.exports = {
    Query: {
        async getUsers() {
            const users = await User.find();

            if (users) return users;
            return [];
        },
        async findUserById(_, { id }){
            const user = await User.findOne({id});
            
            if (user) return user;
            return {};
        }
    },
    Mutation: {
        async updateUsername(_, { id, newUsername }){
            const user = await User.findOne({id});
            const users = User.find();

            var lists = [];
            for(let i = 0; i < users.length; i++){
                lists.push(users[i].id);
            }

            if(!lists.includes(user.id)){
                this.updateUsername(id, newUsername);
            }else{
                return false;
            }
        }
    },
};