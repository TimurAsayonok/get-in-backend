import mongoose from 'mongoose';
import user from '../models/user';

export const getUsers = (req, res, next) => {
  // Find all areas and return json response
  user.find().lean().exec((err, users) => res.json(
    { users}
  ));
}

export const loginUser = (req, res, next) => {
  // Login method
  const userEmail = req.body.email
  const userPassword = req.body.password;

  user.findOne({ email: userEmail, password: userPassword}, (err, user) => {
    if (err) {
      res.status(500).json({
        "message": "Something went wrong"
      })
    }

    if (!user) {
      res.status(404).json({
        "message": "User not found"
      })
    }

    res.status(200).json(user);
  })
}