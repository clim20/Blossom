const { model, Schema, ObjectId } = require('mongoose');
 
const drawingSchema = new Schema({
    _id: ObjectId,
    img: String,
    pos: [Number],
    rot: Number,
    size: [Number]
	// pixelData: [colorformat]
});

const Drawing = model('Drawing', drawingSchema);
module.exports = Drawing;