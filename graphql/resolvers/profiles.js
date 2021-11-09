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
    async followProfile(_, { userId, profileId }) {
      const user = await User.findOne({_id: userId});
      const userProfile = await Profile.findOne({_id: new ObjectId(user.profileId)});
      const profile = await Profile.findOne({_id: new ObjectId(profileId)});
      
      // Update user's following and +-1 to the profile followerCount
      if (userProfile.following.find(id => id.toString() === profile.user.toString())){
        // Already following, unfollow
        userProfile.following = userProfile.following.filter(id => id.toString() !== profile.user.toString());
        profile.followerCount -= 1;
      } else {
        // Not following, follow
        userProfile.following.push(profile.user);
        profile.followerCount += 1;
      }

      const userUpdated = await userProfile.save();
      const profileUpdated = await profile.save();

      if (profileUpdated && userUpdated) return true;
      return false;
    },
    async editProfile(_, { id, updatedProfile }) {
      const profile = await Profile.findOne({_id: new ObjectId(id)});

      const updated = await Profile.updateOne({_id: new ObjectId(id)}, {
        profileImg: updatedProfile.profileImg,
        bannerImg: updatedProfile.bannerImg,
        description: updatedProfile.description, 
        contact: updatedProfile.contact
      });

      if (updated) return profile;
      return profile;
    }
  },
};