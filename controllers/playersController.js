const {createPlayer} = require('../modules/playersModule');

exports.createPlayerC = async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);

    console.log(req.params);
    
    const newPleyer = req.body;

    console.log(newPleyer);
    
    // const createdPlayer = await createPlayer(newPlayer);

    // res.status(200).json({
    //   status: "Success",
    //   data: createdPlayer,
    // });



  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
  
}