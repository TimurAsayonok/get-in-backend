import mongoose from 'mongoose';
import MetroStation from '../models/metrostation';

export const getMetroStations = (req, res, next) => {
  // Find all areas and return json response

  MetroStation.find().lean().exec((err, metrostations) => res.json(
    {
      payload: metrostations
    }
  ));
}