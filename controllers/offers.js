import mongoose from 'mongoose';
import offer from '../models/offer';

export const getOffers = (req, res, next) => {
  // Find all areas and return json response

  offer.find().lean().exec((err, offers) => res.json(
    {
      offers
    }
  ));
}