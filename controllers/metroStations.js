import mongoose from 'mongoose';
import metroStation from '../models/metroStation';

export const getMetroStations = (req, res, next) => {
  // Find all areas and return json response

  metroStation.find().lean().exec((err, metroStations) => res.json(
    {
      metroStations
    }
  ));
}