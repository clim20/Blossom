const ObjectId = require('mongoose').Types.ObjectId;

const Profile = require('../../models/Profile');
const Badge = require('../../models/Badge');
const Quiz = require('../../models/Quiz');

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
    async deleteBadge(_, { badgeId }) {
      const badge = await Badge.findOne({_id: badgeId});
  
      if(badge){
        const quiz = await Quiz.findOne({_id: badge.quiz});

        if(quiz){
          const list = quiz.badges.filter(id => id.toString() !== new ObjectId(badgeId).toString());
          await Quiz.updateOne({_id: quiz._id}, {badges: list});
        }
      }

      const deleted = await Badge.deleteOne({_id: badgeId});
      if (deleted)
        return true;
      return false;
    },
    async addBadge(_, { profileId, badgeId }) {
        const profile = await Profile.findOne({_id: profileId});
  
        let badges = profile.badges;
        badges.push(new ObjectId(badgeId));
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