const { model, Schema, ObjectId } = require('mongoose');
const Image = require('./Image').schema;
 
const userSchema = new Schema({
    id: ObjectId,
    username: String,
    email: String,
    profileId: ObjectId,
    quests: [
        {
            questId: String,
            isCompleted: Boolean,
            image: Image
        }
    ],
    createdAt: String
})

const User = model('User', userSchema);
module.exports = User;