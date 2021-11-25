const ObjectId = require('mongoose').Types.ObjectId;

const Profile = require('../../models/Profile');
const Badge = require('../../models/Badge');

module.exports = {
  Query: {
    async getBadges() {
      const badges = await Badge.find();

      if (badges) return badges;
      return [];
    },
    async findBadgeById(_, { id }) {
      const badge = await Badge.findById(id);

      if (badge) return badge;
      return {};
    },
    async findBadgesByIds(_, { ids }) {
        var badges = []
        for(let i = 0; i < ids.length; i++) {
          const badge = await Badge.findOne({_id: ids[i]});
          if (badge) {
            badges.push(badge);
          }
        }
        
        if (badges) return badges;
        return [];
      },
  },
  Mutation: {
    async createBadge(_, { quiz, rank, image, description }) {
        const newBadge = new Badge({
            _id: new ObjectId(),
            quiz,
            rank,
            image,
            description
        });

        await newBadge.save();
        return newBadge;
    },
    async addBadge(_, { profileId, badgeId }) {
        const profile = await Profile.findOne({_id: profileId});
  
        let badges = profile.badges;
        badges.push(badgeId);
        const updated = await Profile.updateOne({_id: profile._id}, {badges: badges});

        if(updated){
          return true;
        }
        return false;
    },
    async removeBadge(_, { profileId, badgeId }) {
        const profile = await Profile.findOne({_id: profileId});
    
        const list = profile.badges.filter(id => id.toString() !== new ObjectId(badgeId).toString());
        const updated = await Profile.updateOne({_id: profile._id}, {badges: list});
  
        if(updated){
          return true;
        }
        return false;
    },
    async updateBadge(_, { badgeId, image }) {
        const badge = await Badge.findOne({_id: badgeId});
        const updated = await Badge.updateOne({_id: badge._id}, {image: image});
  
        if(updated){
          return true;
        }
        return false;
    },
  },
};