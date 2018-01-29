import mongoose from 'mongoose';
import user from '../models/user';

export const getUsers = (req, res, next) => {
  // Find all areas and return json response

  user.find().lean().exec((err, users) => res.json(
    {
      users
    }
  ));
}