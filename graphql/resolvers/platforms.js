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
        platformImg: "https://i.pinimg.com/originals/36/36/91/363691f9212a3c3184703443c42c7a40.jpg",
        bannerImg: "https://img.wallpapersafari.com/desktop/1024/576/75/50/m1YVTq.jpg",
        description: "",
        contact: "",
        collaborators: [user._id],
        requests: [],
        followerCount: 0,
        quizzes: [],
        collections: [],
        createdAt: new Date().toISOString()
      });

      const updated = await newPlatform.save();

      const profile = await Profile.findOne({_id: user.profileId});
      let platforms = profile.platforms;
      platforms.push(newPlatform._id);
      const updated2 = await Profile.updateOne({_id: profile._id}, {platforms: platforms});

      if(updated && updated2) {
        console.log(newPlatform);
        return newPlatform;
      }
      else return false;
    },
    async addCollaboratorRequest(_, { platformId, userId }) {
      const platform = await Platform.findOne({_id: platformId});
  
      console.log(platform);
      let requests = platform.requests;
      requests.push(userId);
      const updated = await Platform.updateOne({_id: platform._id}, {requests: requests});
  
      if(updated){
        return platform;
      }
      return platform;
    },
    async addCollaborator(_, { platformId, userId }) {
      const platform = await Platform.findOne({_id: platformId});
  
      let collaborators = platform.collaborators;
      collaborators.push(userId);
      const list = platform.requests.filter(id => id.toString() !== new ObjectId(userId).toString());
      const updated = await Platform.updateOne({_id: platform._id}, {collaborators: collaborators, requests: list});

      if(updated){
        return platform;
      }
      return platform;
    },
    async removeCollaboratorRequest(_, { platformId, userId }) {
      const platform = await Platform.findOne({_id: platformId});
  
      const list = platform.requests.filter(id => id.toString() !== new ObjectId(userId).toString());
      const updated = await Platform.updateOne({_id: platform._id}, {requests: list});

      if(updated){
        return platform;
      }
      return platform;
    },
    async removeCollaborator(_, { platformId, userId }) {
      const platform = await Platform.findOne({_id: platformId});
  
      let list = platform.collaborators.filter(id => id.toString() !== new ObjectId(userId).toString());
      const updated = await Platform.updateOne({_id: platform._id}, {collaborators: list});
      
      if(updated){
        return platform;
      }
      return platform;
    },

  }
};