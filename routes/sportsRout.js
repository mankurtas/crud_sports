const express = require('express');
const sportsContorller = require('../controllers/sportsController');

const {getAllSports, getSportByID, addNewSport, deleteSport} = sportsContorller;

const router = express.Router();

router.route('/').get(getAllSports).post(addNewSport);
router.route('/:id').get(getSportByID).delete(deleteSport);


module.exports = router;