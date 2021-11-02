const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Platform = require('../../models/Platform');

module.exports = {
  Query: {
    async getPlatforms() {
        const platforms = await Platform.find();
        
        if (platforms) return platforms;
        return [];
    },
    async findPlatformById(_, { id }) {
        const platform = await Platform.findOne({_id: id});
        
        if (platform) return platform;
        return {};
    },
    async findPlatformsByIds(_, { ids }) {
      console.log("ids", ids)
      var platforms = []
      for(let i = 0; i < ids.length; i++) {
        const platform = await Platform.findOne({_id: ids[i]});
        if (platform) {
          platforms.push(platform);
        }
      }
      
      console.log(platforms);
      if (platforms) return platforms;
      return [];
    },
    async getPopularPlatforms() {
        const platforms = await Platform.find().sort({ followerCount: -1 });
      
        var res = [];
        for(let i = 0; i < 5; i++) {
          if (platforms[i]) {
            res.push(platforms[i]);
          }
        }

        if (res) return res;
        return [];
    }
  },
  Mutation: {
    async createPlatform(_, { owner, name }) {
        
      const ownerId = new ObjectId(owner);
      const user = await User.findOne({_id: ownerId});

      const newPlatform = new Platform({
        _id: new ObjectId(),
        name,
        owner: user._id,
        platformImg: {},
        bannerImg: {},
        description: "",
        contact: "",
        collaborators: [],
        requests: [],
        followerCount: 0,
        quizzes: [],
        collections: [],
        createdAt: new Date().toISOString()
      });

      const updated = await newPlatform.save();

      const profile = await Profile.findOne(new ObjectId(user.profileId));
      let platforms = profile.platforms;
      platforms.push(newPlatform._id);
      const updated2 = await Profile.updateOne({id: profile._id}, {platforms: platforms});

      if(updated && updated2) {
        console.log(newPlatform);
        return newPlatform;
      }
      else return false;
    }
  },
};