const { model, Schema, ObjectId } = require('mongoose');
 
const userSchema = new Schema({
    _id: ObjectId,
    username: String,
    email: String,
    profileId: ObjectId,
    quests: [
        {
            _id: ObjectId,
            isCompleted: Boolean,
            image: String
        }
    ],
    createdAt: String
})

const User = model('User', userSchema);
module.exports = User;