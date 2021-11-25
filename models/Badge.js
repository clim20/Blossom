const { model, Schema, ObjectId } = require('mongoose');

const badgeSchema = new Schema({
    _id: ObjectId,
    quiz: ObjectId,
    rank: Number,
    image: String,
    description: String,
});

const Badge = model('Badge', badgeSchema);
module.exports = Badge;