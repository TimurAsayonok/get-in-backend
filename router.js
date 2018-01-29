import express, { Router } from 'express';

// Import actions from areas controller
import { getAreas } from './controllers/areas';
import { getEducations } from './controllers/educations';
import { getMetroStations } from './controllers/metroStations';
import { getOffers } from './controllers/offers';
import { getUsers, loginUser, getFavoriteOffers, remindPassword, singUpUser } from './controllers/users';

const router = Router();

router.route('/areas')
  .get(getAreas);

router.route('/educations')
  .get(getEducations);

router.route('/metro_stations')
  .get(getMetroStations);

router.route('/offers')
  .get(getOffers);

/** user's methods */
router.route('/users')
  .get(getUsers);

router.route('/login')
  .post(loginUser);

router.route('/remind_password')
  .post(remindPassword);

router.route('/singup')
  .post(singUpUser);

router.route('/user/:user_id/favorite_offers')
  .get(getFavoriteOffers);

export default router;