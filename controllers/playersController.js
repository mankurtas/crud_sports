const {createPlayer} = require('../modules/playersModule');

exports.createPlayerForSport = async (req, res) => {
  try {
    const {sportID} = req.params;

    let newPlayer = req.body;

    newPlayer["sport_id"] = Number(sportID);

    const cretedPlayer = await createPlayer(newPlayer);

    res.status(200).json({
      status: "Success",
      data: cretedPlayer,
    });



  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
  
}

//Get players by sport
exports.getPlayersBySport = async (req,res) => {

  console.log(req.params.sportID);
  
  console.log("We are here");
  
  
}