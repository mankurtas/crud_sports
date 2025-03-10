
const {createSport, selectALlSports, selectSportByID, deleteSport, updateSport} = require('../modules/sportsModule')

exports.createSportC = async (req, res) => {
  try {
    const newSport = req.body;
    const createdSport = await createSport(newSport);

    res.status(200).json({
      status: "Success",
      data: createdSport,
    });



  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
  
}



exports.getAllSportsC = async (req, res) => {

  const allSports = await selectALlSports();

  res.status(200).json({
    status: "success",
    data: allSports,
  });
};

exports.getSportByIdC =  async (req, res) => {
  const {id} = req.params;

  const sport = await selectSportByID(id);

  if(!sport) {
    return res.status(404).json({
       status: "fail",
       message: "Invalid sport ID",
     });
   };
 
   res.status(200).json({
     status: "Success",
     data: sport
   });
  
}


//Delete sport

exports.deleteSportC = async (req, res) => {
  const {id} = req.params;
  
  const sportDeleted = await selectSportByID(id);

  if(sportDeleted){

      await deleteSport(id);

      return res.status(200).json({
        status: "Success",
        message: "Sport deleted",
        data: sportDeleted,
      });
    }else{
    res.status(404).json({
      status: "Fail",
      message: "Invalid sports ID",
    });
  };
};

//Update sport 

exports.updateSportById = async (req, res) => {

  const {id} = req.params;
  const upSport = req.body;

  const sportUpdated = await updateSport (id, upSport);


  if(sportUpdated){

    return res.status(200).json({
      status: "Success",
      message: "Sport updated",
      data: sportUpdated,
    });
  }else{
  res.status(404).json({
    status: "Fail",
    message: "Invalid sports ID",
  });
};
 
}