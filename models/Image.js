const { model, Schema, ObjectId } = require('mongoose');
 
const imageSchema = new Schema({
    id: ObjectId,
	data: Buffer, 
    contentType: String
});

const Image = model('Image', imageSchema);
module.exports = Image;