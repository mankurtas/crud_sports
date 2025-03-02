const express = require('express');
const sportsContorller = require('../controllers/sportsController');

const {getAllSports} = sportsContorller;

const router = express.Router();

router.route('/').get(getAllSports);


module.exports = router;