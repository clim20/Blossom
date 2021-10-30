const { model, Schema, ObjectId } = require('mongoose');
const Image = require('./Image').schema;
const Quiz = require('./Quiz').schema;

const badgeSchema = new Schema({
    id: ObjectId,
    quiz: ObjectId,
    rank: Number,
    image: Image
});

const Badge = model('Badge', badgeSchema);
module.exports = Badge;