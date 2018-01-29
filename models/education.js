import mongoose, { Schema } from 'mongoose';

const educationSchema = new Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  logo: String
});

export default mongoose.model('education', educationSchema);