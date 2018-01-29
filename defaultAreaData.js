import mongoose from 'mongoose'
import Area from './models/area'

const areas = [
  // {
  //   name: 'First'
  // },
  // {
  //   name: 'Second'
  // }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/getIn');

areas.map( data => {
  // Initialize a model with movie data
  const area = Area(data);

  area.save();
});
