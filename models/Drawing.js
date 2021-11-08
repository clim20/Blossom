const { model, Schema, ObjectId } = require('mongoose');
 
const drawingSchema = new Schema({
    _id: ObjectId,
	// pixelData: [colorformat]
});

const Drawing = model('Drawing', drawingSchema);
module.exports = Drawing;