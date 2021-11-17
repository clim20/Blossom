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
    async getPopularPlatforms() {
      const platforms = await Platform.find().sort({ followerCount: -1 }).limit(4);

      if (platforms) return platforms;
      return [];
    },
    async findPlatformById(_, { id }) {
        const platform = await Platform.findOne({_id: id});
        
        if (platform) return platform;
        return {};
    },
    async findPlatformsByIds(_, { ids }) {
      var platforms = []
      for(let i = 0; i < ids.length; i++) {
        const platform = await Platform.findOne({_id: ids[i]});
        if (platform) {
          platforms.push(platform);
        }
      }
      
      if (platforms) return platforms;
      return [];
    },
    async findCollaboratorsByIds(_, { ids }){
      var collaborators = []

      for(let i = 0; i < ids.length; i++) {
        const user = await User.findOne({_id: new ObjectId(ids[i])});

        if (user) {
          collaborators.push(user);
        }
      }

      return collaborators;
    },
  },
  Mutation: {
    async createPlatform(_, { owner, name }) {
      const ownerId = new ObjectId(owner);
      const user = await User.findOne({_id: ownerId}); 
      const platformNameExist = await Platform.findOne({name: name});
  
      if(!platformNameExist && name !== '') {
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
          featuredQuiz: null,
          quizzes: [],
          quizCollections: [],
          createdAt: new Date().toISOString()
        });
  
        const updated = await newPlatform.save();
  
        const profile = await Profile.findOne({_id: new ObjectId(user.profileId)});
        let platforms = profile.platforms;
        platforms.push(newPlatform._id);
        const updated2 = await Profile.updateOne({_id: profile._id}, {platforms: platforms});
  
        if(updated && updated2) {
          return newPlatform;
        }
      }
      return new Platform({
        _id: new ObjectId(),
        name: "",
        owner: user._id,
        platformImg: "",
        bannerImg: "",
        description: "",
        contact: "",
        collaborators: [user._id],
        requests: [],
        followerCount: 0,
        featuredQuiz: null,
        quizzes: [],
        quizCollections: [],
        createdAt: new Date().toISOString()
      });
    },
    async deletePlatform(_, { platformId }){
      const platform = await Platform.findOne({_id: platformId});
      
      
      if(platform){
        const collaborators = platform.collaborators;

        for(let i = 0; i < collaborators.length; i++) {
          if (collaborators[i]) {
            let profile = await Profile.findOne({user: collaborators[i]})
            let profilePlatforms = profile.platforms.filter(platform => platform._id.toString() !== platformId.toString());
            await Profile.updateOne({user: profile.user}, {platforms: profilePlatforms});
          }
        }
      }

      const deleted = await Platform.deleteOne({_id: platformId});
      if (deleted)
        return true;
      return false;
    },
    async followPlatform(_, { userId, platformId }) {
      const user = await User.findOne({_id: userId});
      const userProfile = await Profile.findOne({_id: new ObjectId(user.profileId)});
      const platform = await Platform.findOne({_id: new ObjectId(platformId)});
      
      // Update user's following and +-1 to the platform followerCount
      if (userProfile.following.find(id => id.toString() === platformId.toString())){
        // Already following, unfollow
        userProfile.following = userProfile.following.filter(id => id.toString() !== platformId.toString());
        platform.followerCount -= 1;
      } else {
        // Not following, follow
        userProfile.following.push(platformId);
        platform.followerCount += 1;
      }

      const userUpdated = await userProfile.save();
      const platformUpdated = await platform.save();

      if (platformUpdated && userUpdated) return true;
      return false;
    },
    async addCollaboratorRequest(_, { platformId, userId }) {
      const platform = await Platform.findOne({_id: platformId});
  
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
      const user = await User.findOne({_id: userId});
      const profile = await Profile.findOne({_id: user.profileId});

      let collaborators = platform.collaborators;
      collaborators.push(userId);
      const list = platform.requests.filter(id => id.toString() !== new ObjectId(userId).toString());
      const updated = await Platform.updateOne({_id: platform._id}, {collaborators: collaborators, requests: list});

      let platforms = profile.platforms;
      platforms.push(platformId);
      const updated2 = await Profile.updateOne({_id: profile._id}, {platforms: platforms});

      if(updated && updated2){
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
      const user = await User.findOne({_id: userId});
      const profile = await Profile.findOne({_id: user.profileId});

      let list = platform.collaborators.filter(_id => _id.toString() !== new ObjectId(userId).toString());
      const updated = await Platform.updateOne({_id: platform._id}, {collaborators: list});
      
      let list2 = profile.platforms.filter(_id => _id.toString() !== new ObjectId(platformId).toString());
      const updated2 = await Profile.updateOne({_id: profile._id}, {platforms: list2});
      
      if(updated & updated2){
        return platform;
      }
      return platform;
    },
    async editPlatform(_, { id, updatedPlatform }) {
      const platform = await Platform.findOne({_id: new ObjectId(id)});

      const updated = await Platform.updateOne({_id: new ObjectId(id)}, {
        platformImg: updatedPlatform.platformImg,
        bannerImg: updatedPlatform.bannerImg,
        description: updatedPlatform.description, 
        contact: updatedPlatform.contact
      });

      if (updated) return platform;
      return platform;
    }
  }
};