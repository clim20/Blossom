const ObjectId = require('mongoose').Types.ObjectId;

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Platform = require('../../models/Platform');
const QuizCollection = require('../../models/QuizCollection');

module.exports = {
  Query: {
    async getQuizCollections() {
        const quizCollections = await QuizCollection.find();
        
        if (quizCollections) return quizCollections;
        return [];
    },
    async getPopularQuizCollectionsOfId(_, { id }) {
      const profile = await Profile.findOne({_id: new ObjectId(id)});
      const platform = await Platform.findOne({_id: new ObjectId(id)});

      const quizCollectionIds = profile ? profile.quizCollections : platform ? platform.quizCollections : [];

      var quizCollections = [];
      for (let i = 0; i < quizCollectionIds.length; i++) {
        const quizCollection = await QuizCollection.findOne({_id: quizCollectionIds[i]});
        if (quizCollection) {
          quizCollections.push(quizCollection);
        }
      }

      quizCollections = quizCollections.reverse().slice(0, 3);
      
      if (quizCollections) return quizCollections;
      return [];
    },
    async findQuizCollectionById(_, { id }) {
        const quizCollection = await QuizCollection.findOne({_id: id});
        
        if (quizCollection) return quizCollection;
        return {};
    },
    async findQuizCollectionByIds(_, { ids }) {
      var quizCollections = []
      for(let i = 0; i < ids.length; i++) {
        const quizCollection = await QuizCollection.findOne({_id: ids[i]});
        if (quizCollection) {
          quizCollections.push(quizCollection);
        }
      }
      
      if (quizCollections) return quizCollections;
      return [];
    }
  },
  Mutation: {
    async createQuizCollection(_, { owner, name }) {
      const ownerId = new ObjectId(owner);
      const user = await User.findOne({_id: ownerId}); 
      const quizCollectionNameExist = await QuizCollection.findOne({name: name, creator: user._id});
  
      if(!quizCollectionNameExist && name !== '') {
        const newQuizCollection = new QuizCollection({
          _id: new ObjectId(),
          name,
          creator: user._id, 
          img: "https://i.pinimg.com/originals/36/36/91/363691f9212a3c3184703443c42c7a40.jpg",
          description: "",
          quizzes: [],
          createdAt: new Date().toISOString()
        });

        const updated = await newQuizCollection.save();

        const profile = await Profile.findOne({_id: new ObjectId(user.profileId)});
        let quizCollections = profile.quizCollections;
        quizCollections.push(newQuizCollection._id);
        const updated2 = await Profile.updateOne({_id: profile._id}, {quizCollections: quizCollections});

        if(updated && updated2) {
          return newQuizCollection;
        }
      }
      return new QuizCollection({
        _id: new ObjectId(),
        name: "",
        creator: user._id, 
        img: "https://i.pinimg.com/originals/36/36/91/363691f9212a3c3184703443c42c7a40.jpg",
        description: "",
        quizzes: [],
        createdAt: new Date().toISOString()
      });
    },
    async deleteQuizCollection(_, { quizCollectionId }){
      const quizCollection = await QuizCollection.findOne({_id: quizCollectionId});
      
      if(quizCollection){
        const user = await User.findOne({_id: quizCollection.creator});
        const profile = await Profile.findOne({_id: user.profileId});
        
        const platforms = await Platform.find({quizCollection: {$in: new ObjectId(quizCollectionId)}});
        for (let i = 0; i < platforms.length; i++){
          if (platforms[i]) {
            let platform = await Platform.findOne({_id: platforms[i]._id })
            let quizCollections = platform.quizCollections.filter(q => q._id.toString() !== quizCollectionId.toString());
            await Platform.updateOne({_id: platform._id}, {quizCollections: quizCollections});
          }
        }

        let quizCollections = profile.quizCollections.filter(quizCollection => quizCollection._id.toString() !== quizCollectionId.toString());
        await Profile.updateOne({user: quizCollection.creator}, {quizCollections: quizCollections});

        const deleted = await QuizCollection.deleteOne({_id: quizCollectionId});
        if (deleted) return true;
      }
      return false;
    },
    async addQuizCollection(_, { platformId, quizCollectionId }){
      const platform = await Platform.findOne({_id: platformId});
      
      if(platform){
        let quizCollections = platform.quizCollections;
        quizCollections.push(quizCollectionId);

        const updated =  await Platform.updateOne({_id: platformId}, {quizCollections: quizCollections});

        if (updated) return platform;
      }
      return false;
    },
    async removeQuizCollection(_, { platformId, quizCollectionId }){
      const platform = await Platform.findOne({_id: platformId});
      
      if(platform){
        let quizCollections = platform.quizCollections.filter(quizCollection => quizCollection._id.toString() !== quizCollectionId.toString());
        const updated =  await Platform.updateOne({_id: platformId}, {quizCollections: quizCollections});

        if (updated) return true;
      }
      return false;
    },
    async addQuizToQuizCollection(_, { quizId, quizCollectionId }) {
      const quizCollection = await QuizCollection.findOne({_id: quizCollectionId}); 
  
      let quizzes = quizCollection.quizzes;
      quizzes.push(quizId);
      const updated = await QuizCollection.updateOne({_id: quizCollectionId}, {quizzes: quizzes});

      if(updated) {
        return quizCollection;
      }
      return quizCollection;
    },  
    async removeQuizFromQuizCollection(_, { quizId, quizCollectionId }) {
      const quizCollection = await QuizCollection.findOne({_id: quizCollectionId}); 
  
      let quizzes = quizCollection.quizzes.filter(quiz => quiz._id.toString() !== quizId.toString());
      const updated = await QuizCollection.updateOne({_id: quizCollectionId}, {quizzes: quizzes});

      if(updated) return true;
      return false;
    },  
    async editQuizCollection(_, { id, updatedQuizCollection }) {
      const quizCollection = await QuizCollection.findOne({_id: new ObjectId(id)});

      const updated = await QuizCollection.updateOne({_id: new ObjectId(id)}, {
        img: updatedQuizCollection.img,
        name: updatedQuizCollection.name,
        description: updatedQuizCollection.description,
        quizzes: updatedQuizCollection.quizzes
      });

      if (updated) return quizCollection;
      return quizCollection;
    },
  }
};