import mongoose, { Schema } from 'mongoose';
import { areaSchema } from './area';

// const Area = new area();

export const offerSchema = new Schema({
  name: String,
  type: String,
  location: {
    lat: Number,
    lng: Number,
    street: String,
    city: String
  },
  rooms: Number,
  rating: Number,
  price: Number,
  area: areaSchema,
  photo: String,
  description: String
});

export default mongoose.model('offer', offerSchema);