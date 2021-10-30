const { model, Schema, ObjectId } = require('mongoose');
const Image = require('./Image').schema;

const badgeSchema = new Schema({
    _id: ObjectId,
    quiz: ObjectId,
    rank: Number,
    image: Image
});

const Badge = model('Badge', badgeSchema);
module.exports = Badge;