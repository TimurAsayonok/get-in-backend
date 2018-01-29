import mongoose, { Schema } from 'mongoose'

const metroStationSchema = new Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  }
});

export default mongoose.model('metroStation', metroStationSchema);