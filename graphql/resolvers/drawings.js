const ObjectId = require('mongoose').Types.ObjectId;

const Drawing = require('../../models/Drawing');

module.exports = {
  Query: {
    
    async findDrawingsByIds(_, { ids }) {
        var drawings = []
        for(let i = 0; i < ids.length; i++) {
          const drawing = await Drawing.findOne({_id: ids[i]});
          if (drawing) {
            drawings.push(drawing);
          }
        }
        
        if (drawings) return drawings;
        return [];
      },
  },
  Mutation: {
    async createDrawing(_, { image, position, rotation, sizein }) {
        const newDraw = new Drawing({
            _id: new ObjectId(),
            img: image, 
            pos: position,
            rot: rotation,
            size: sizein
        });

        await newDraw.save();
        return newDraw;
    },
    async removeDrawing(_, { drawingId }) {
        //const drawing = await Drawing.findOne({_id: drawingId});
    
        const deleted = await Drawing.deleteOne({_id: drawingId});

        if (deleted){
          return true;
        }
        return false;
    },
    async updateDrawing(_, {drawingId, position, rotation, sizein }) {
        const draw = await Drawing.findOne({_id: drawingId});
        const updated = await Drawing.updateOne({_id: draw._id}, {pos: position, rot: rotation, size: sizein});
  
        if(updated){
          return true;
        }
        return false;
    },
  },
};