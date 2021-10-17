const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    scores: [Number],
    createdAt: String
})

module.exports = model('User', userSchema);