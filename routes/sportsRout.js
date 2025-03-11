const express = require('express');
const sportsContorller = require('../controllers/sportsController');
const playerCntoller = require('../controllers/playersController');

//validators
const validateNewSport = require('../validators/newSport');
const validateSportId = require('../validators/sportId');
const validate = require('../validators/validate');


//functions from sport controller
const {
    getAllSportsC, 
    createSportC, 
    getSportByIdC, 
    deleteSportC, 
    updateSportById
} = sportsContorller;

//functions from player controller
const {
    getPlayersBySportC, 
    createPlayerForSport, 
    updatePlayerC, 
    deletePlpayerC
} = playerCntoller;

const router = express.Router();

//sport routes
router.route('/').get(getAllSportsC).post(validateNewSport, validate, createSportC);
router.route('/:id').get(validateSportId, validate, getSportByIdC).delete(deleteSportC).put(updateSportById);

//player related routes
router.route('/:sportID/players').get( validateSportId, validate,getPlayersBySportC).post(validateSportId, validate, createPlayerForSport);
router.route('/:sportId/players/:playerId').put(validateSportId, validate, updatePlayerC).delete(deletePlpayerC)


module.exports = router;