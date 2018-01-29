import mongoose from 'mongoose';
import area from '../models/area';

export const getAreas = (req, res, next) => {
   // Find all areas and return json response

   area.find().lean().exec((err, areas) => res.json(
     {
       areas: areas
     }
   ));
}