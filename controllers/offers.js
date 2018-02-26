import mongoose from 'mongoose';
import Offer from 'models/offer';
import _ from 'lodash';

export const getOffers = (req, res, next) => {
  // Find all areas and return json response

  Offer.find().lean().exec((err, offers) => res.json(
    { offers }
  ));
}

/** in 1 km radius */
const findMaxMinLatLng = (location) => {
  const latToKm = 110.574 * location.lat;
  const lngToKm = 111.320 * location.lng;
  const maxLat = (latToKm + 1) / 110.574;
  const maxLng = (lngToKm + 1) / 111.320;
  const minLat = (latToKm - 1) / 110.574;
  const minLng = (lngToKm - 1) / 111.320;

  return { 
    maxLat: maxLat.toFixed(7),
    maxLng: maxLng.toFixed(7),
    minLat: minLat.toFixed(7),
    minLng: minLng.toFixed(7)
  }
}

export const findOffers = (req, res, next) => {
  const type = req.body.type;
  let location = req.body.location;
  const price = req.body.price;
  const roomNumbers = req.body.roomNumbers;

  if (location.lng && location.lat) {
    location = findMaxMinLatLng(location);

    Offer.find({ type: type })
      .where("location.lat").gte(location.minLat).lte(location.maxLat)
      .where("location.lng").gte(location.minLng).lte(location.maxLng)
      .where("price").gte(price.from).lte(price.to)
      .where("rooms").equals(roomNumbers)
      .exec((err, offers) => {
        if (err) {
          return res.status(500).json({ status: 500, message: "Find offers. Something went wrong" });
        }

        if (_.isEmpty(offers)) {
          return res.status(404).json({status: 404, message: "Empty result."})
        }

        return res.status(200).json({ status: 200, payload: offers});
      });
  } else {
    Offer.find({ type: type })
      .where("area.name").equals(location.area)
      .where("price").gte(price.from).lte(price.to)
      .where("rooms").equals(roomNumbers)
      .exec((err, offers) => {
        if (err) {
          return res.status(500).json({ status: 500, message: "Find offers. Something went wrong" });
        }

        if (_.isEmpty(offers)) {
          return res.status(404).json({ status: 404, message: "Empty result." })
        }

        return res.status(200).json({ status: 200, payload: offers });
      });
  }
}