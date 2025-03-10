const express = require('express');
const sportsContorller = require('../controllers/sportsController');
const playerCntoller = require('../controllers/playersController');


//functions from sport controller
const {getAllSportsC, createSportC, getSportByIdC, deleteSportC, updateSportById} = sportsContorller;

//functions from player controller
const {getPlayersBySportC, createPlayerForSport, updatePlayerC} = playerCntoller;

const router = express.Router();

//sport routes
router.route('/').get(getAllSportsC).post(createSportC);
router.route('/:id').get(getSportByIdC).delete(deleteSportC).put(updateSportById);



//player related routes
router.route('/:sportID/players').get(getPlayersBySportC).post(createPlayerForSport);
router.route('/:sportId/players/:playerId').put(updatePlayerC)


module.exports = router;