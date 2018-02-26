import express, { Router } from 'express';

// Import actions from areas controller
import { getAreas } from './controllers/areas';
import { getEducations } from './controllers/educations';
// import { getMetroStations } from './controllers/metroStations';
import { getOffers, findOffers } from './controllers/offers';
import {
  getUsers,
  loginUser,
  getChosenOffers,
  remindPassword,
  singUpUser,
  addChosenOffer,
  removeChosenOffer,
  getUserChats
} from './controllers/users';

const router = Router();

router.route('/areas')
  .get(getAreas);

router.route('/educations')
  .get(getEducations);

router.route('/metro_stations')
  .get(getMetroStations);

/** offer's methods */
router.route('/offers')
  .get(getOffers);
router.route('/find_offers')
  .post(findOffers);

/** user's methods */
router.route('/users')
  .get(getUsers);

router.route('/login')
  .post(loginUser);

router.route('/remind_password')
  .post(remindPassword);

router.route('/singup')
  .post(singUpUser);

router.route('/user/:user_id/chosen_offers')
  .get(getChosenOffers);

router.route('/user/:user_id/chosen_offer/')
  .put(addChosenOffer)
  .delete(removeChosenOffer);

router.route('/user/:user_id/chats')
  .get(getUserChats);

export default router;