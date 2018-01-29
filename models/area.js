import mongoose, { Schema } from 'mongoose';

// Define area schema

export const areaSchema = new Schema({
  id: {
    type: Number,
    // unique: true,
    index: true
  },
  name: {
    type: String
  }
});

// Export Mongoose model
export default mongoose.model('area', areaSchema);