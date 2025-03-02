const fs = require('fs');
const {json} = require('stream/consumers');

const sports = JSON.parse(fs.readFileSync('./data/sportsData.json'));

exports.getAllSports = (req, res) => {
  res.status(200).json({
    status: "success",
    data: sports,
  });
};