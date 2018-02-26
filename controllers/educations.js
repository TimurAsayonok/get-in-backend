import mongoose from 'mongoose';
import education from 'models/education';

export const getEducations = (req, res, next) => {
  // Find all areas and return json response

  education.find().lean().exec((err, educations) => res.json(
    {
      payload: educations
    }
  ));
}