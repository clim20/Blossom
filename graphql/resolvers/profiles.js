const ObjectId = require('mongoose').Types.ObjectId;

const Profile = require('../../models/Profile');

module.exports = {
  Query: {
    async getProfiles() {
        const profiles = await Profile.find();
        
        if (profiles) return profiles;
        return [];
    },
    async findProfileById(_, { id }) {
        const profile = await Profile.findOne({id: id});
        console.log(profile);
        if (profile) return profile;
        return {};
    }
  },
  Mutation: {

  },
};