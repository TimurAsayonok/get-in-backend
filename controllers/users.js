import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import _ from 'lodash';

import User from '../models/user';

export const getUsers = (req, res, next) => {
  // Find all areas and return json response
  User.find().lean().exec((err, users) => res.json(
    { users}
  ));
}

export const loginUser = (req, res, next) => {
  // Login method
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  User.findOne({ email: userEmail, password: userPassword}, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, payload: user });
  })
}

export const remindPassword = (req, res, next) => {
  const userEmail = req.body.user_email;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'getinmailsender@gmail.com',
      pass: 'getinmailsender12'
    }
  });

  User.findOne({ email: userEmail}, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    } else {

      const mailOptions = {
        from: 'GetIn <getinmailsender@gmail.com>', // sender address
        to: userEmail, // list of receivers
        subject: 'GetIn reminds your password', // Subject line
        html: `<p>Hello ${user.first_name} ${user.last_name}. Your Password is: ${user.password}</p>`// plain text body
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          return res.status(500).json({ status: 500, message: "Something went wrong" });
        else
          return res.status(200).json({ status: 200 });
      });
    }
  });
}

export const singUpUser = (req, res, next) => {
  const userEmail = req.body.email;
  const password = req.body.password;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;

  User.findOne({ email: userEmail}, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (user) {
      return res.status(404).json({ status: 403, message: "User has been already created" });
    } else {
      const newUser = new User();
      
      newUser.email = userEmail;
      newUser.password = password;
      newUser.first_name = firstName;
      newUser.last_name = lastName;

      newUser.save((err, user) => {
        if (err) {
          return res.status(500).json({ status: 500, message: "Create new user. Something went wrong" });
        }

        return res.status(200).json({ status: 200, payload: user });
      });
    }
  })
}

export const getFavoriteOffers = (req, res, next) => {
  const userId = req.params.user_id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, payload: user.favorite_offers });
  })
}