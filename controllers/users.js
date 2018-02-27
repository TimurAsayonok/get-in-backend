import mongoose from 'mongoose';
import nodemailer from 'nodemailer'
import _ from 'lodash';

import User from '../models/user';
import Offer from '../models/offer';
import Chat from '../models/chat';

// Find all areas and return json response
export const getUsers = (req, res, next) => {
  User.find().lean().exec((err, users) => res.json(
    { users}
  ));
}

/** Login to app Method */
export const loginUser = (req, res, next) => {
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
  });
}

/** Remind Password Method. Will send user password for app into email account */
export const remindPassword = (req, res, next) => {
  const userEmail = req.body.email;

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

/** Registration new user */
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
      return res.status(403).json({ status: 403, message: "User has been already created" });
    } else {
      const newUser = new User();
      
      newUser.email = userEmail;
      newUser.password = password;
      newUser.first_name = firstName;
      newUser.last_name = lastName;

      newUser.save((err, userSignUp) => {
        if (err) {
          return res.status(500).json({ status: 500, message: "Create new user. Something went wrong" });
        }

        return res.status(200).json({ status: 200, payload: userSignUp });
      });
    }
  });
}

/** Get all user's favorite offers by userId */
export const getChosenOffers = (req, res, next) => {
  const userId = req.params.user_id;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, payload: user.favorite_offers });
  });
}

/** Add new favorite offer for user by offerId */
export const addChosenOffer = (req, res, next) => {
  const userId = req.params.user_id;
  const offerId = req.body.offerId;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    Offer.findById(offerId, (err, offer) => {
      if (err) {
        return res.status(500).json({ status: 500, message: "Something went wrong" });
      }

      if (!offer) {
        return res.status(404).json({ status: 404, message: "Offer not found" });
      }
      user.favorite_offers.push(offer);

      user.save((err, user) => {
        if (err) {
          return res.status(500).json({ status: 500, message: err});
        }
        return res.status(200).json({ status: 200, payload: user.favorite_offers});
      });
    });
  })
}

/** Remove user's favorite offer by offerId */
export const removeChosenOffer = (req, res, next) => {
  const userId = req.params.user_id;
  const offerId = req.body.offerId;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Something went wrong" });
    }

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }
    //delete offer if offer._is === offerId
    const newOffers = _.remove(user.favorite_offers, (offer) => offer._id === offerId);
    //update user method
    user.favorite_offers = newOffers;

    user.save((err, user) => {
      if (err) {
        return res.status(500).json({ status: 500, message: "Remove offer. Something went wrong" });
      }
      return res.status(200).json({ status: 200, offerId });
    });
  })
}

export const getUserChats = (req, res, next) => {
  const userId = req.params.user_id;

  Chat.find({ "receiverId": userId }).lean().exec((err, chats) => {
    if (err) {
      return res.status(500).json({ status: 500, message: "Get chats. Something went wrong" });
    }
    return res.status(200).json({ status: 200, payload: chats });
  });
}