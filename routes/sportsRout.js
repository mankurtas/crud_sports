const express = require('express');
const sportsContorller = require('../controllers/sportsController');

const {getAllSports, getSportByID, addNewSport} = sportsContorller;

const router = express.Router();

router.route('/').get(getAllSports).post(addNewSport);
router.route('/:id').get(getSportByID);


module.exports = router;