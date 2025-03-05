const express = require('express');
const sportsContorller = require('../controllers/sportsController');

const {getAllSportsC, createSportC, getSportByIdC} = sportsContorller;

const router = express.Router();

router.route('/').get(getAllSportsC).post(createSportC);
router.route('/:id').get(getSportByIdC).delete().put();



module.exports = router;