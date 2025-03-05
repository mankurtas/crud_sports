const express = require('express');
const sportsContorller = require('../controllers/sportsController');

const {getAllSportsC, createSportC, getSportByIdC, deleteSportC} = sportsContorller;

const router = express.Router();

router.route('/').get(getAllSportsC).post(createSportC);
router.route('/:id').get(getSportByIdC).delete(deleteSportC).put();



module.exports = router;