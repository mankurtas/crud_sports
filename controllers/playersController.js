const {createPlayer, getPlayersBySport, updatePlayer} = require('../modules/playersModule');

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
exports.getPlayersBySportC = async (req,res) => {

    try {
      const {sportID} = req.params
  
      const playersBySport = await getPlayersBySport (sportID);

      res.status(200).json({
        status: "Success",
        data: playersBySport,
      });

    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
}

//Update player

exports.updatePlayerC = async (req, res) => {

    const {playerId} = req.params;

    const updatePl = req.body;

    const upPlayer = await updatePlayer(playerId, updatePl);


 if(upPlayer){

    return res.status(200).json({
      status: "Success",
      message: "Player updated",
      data: upPlayer,
    });
  }else{
  res.status(404).json({
    status: "Fail",
    message: "Invalid player ID",
  });
  };
    
  
}