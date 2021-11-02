const ObjectId = require('mongoose').Types.ObjectId;

const Profile = require('../../models/Profile');
const Platform = require('../../models/Platform');
const User = require('../../models/User');

module.exports = {
  Query: {
    async getProfiles() {
        const profiles = await Profile.find();
        
        if (profiles) return profiles;
        return [];
    },
    async findProfileById(_, { id }) {
        const profile = await Profile.findOne({_id: id});
        console.log(profile);
        if (profile) return profile;
        return {};
    },
    async findFollowingByIds(_, { ids }) {
      var following = []
      for(let i = 0; i < ids.length; i++) {
        const user = await User.findOne({_id: ids[i]});
        if (user) {
          following.push(user);
        }

        const platform = await Platform.findOne({_id: ids[i]});
        if (platform) {
          following.push(platform);
        }
      }
      
      if (following) return following;
      return [];
    },
  },
  Mutation: {

  },
};