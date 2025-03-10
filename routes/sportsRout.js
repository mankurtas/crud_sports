const express = require('express');
const sportsContorller = require('../controllers/sportsController');
const playerCntoller = require('../controllers/playersController');



const {getAllSportsC, createSportC, getSportByIdC, deleteSportC, updateSportById} = sportsContorller;

const {getPlayersBySport, createPlayerForSport} = playerCntoller;

const router = express.Router();

router.route('/').get(getAllSportsC).post(createSportC);
router.route('/:id').get(getSportByIdC).delete(deleteSportC).put(updateSportById);

router.route('/:sportID/players').get(getPlayersBySport).post(createPlayerForSport);



module.exports = router;