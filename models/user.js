import mongoose, { Schema } from 'mongoose';
import { offerSchema } from './offer';

const userSchema = new Schema({
  email: String,
  password: String,
  photo: String,
  first_name: String,
  last_name: String,
  facebook_id: Number,
  phone: Number,
  favorite_offers: [offerSchema]
});

export default mongoose.model('user', userSchema);