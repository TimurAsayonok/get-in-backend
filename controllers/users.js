import mongoose from 'mongoose';
import user from '../models/user';
import _ from 'lodash';

export const getUsers = (req, res, next) => {
  // Find all areas and return json response
  user.find().lean().exec((err, users) => res.json(
    { users}
  ));
}

export const loginUser = (req, res, next) => {
  // Login method
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  user.findOne({ email: userEmail, password: userPassword}, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, payload: user });
  })
}

export const getFavoriteOffers = (req, res, next) => {
  const userId = req.params.user_id;
  console.log(userId);
  user.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, payload: user.favorite_offers });
  })
}