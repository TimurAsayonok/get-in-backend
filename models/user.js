import mongoose, { Schema } from 'mongoose';
import { offerSchema } from './offer';

const userSchema = new Schema({
  email: String,
  password: String,
  photo: { 
    type: String,
    default: ''
  },
  first_name: { 
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    default: ''
  },
  facebook_id: {
    type: Number,
    default: null
  },
  phone: {
    type: Number,
    default: null
  },
  favorite_offers: { 
    type: [offerSchema],
    default: []
  }
});

export default mongoose.model('user', userSchema);