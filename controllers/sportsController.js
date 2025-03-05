
const {createSport, selectALlSports, selectSportByID, deleteSport} = require('../modules/sportsModule')

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


exports.addNewSport = (req,res) => {
  const id = ((Number(sports[sports.length - 1].id) + 1)).toString();
  
  
  let newSport =  {id,...req.body};


  sports.push(newSport);

  fs.writeFile('./data/sportsData.json', JSON.stringify(sports), (err) => {
    if(err){
      return res.status(500).json({
        status: "Fail",
        message: "Unable to write to file",
      });
    }else{
      return res.status(201).json({
        status: "success",
        data: newSport,
      });
    };
  });
};

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

exports.updateSportById = (req, res) => {

  const {id} = req.params;
  console.log(id);
  
  const sport = sports.find(sport => sport.id === id);
//  console.log(sport.name);
 
  const {name, popularityRank} = req.body;

  // console.log(typeof(name));
  

  // console.log(name);
  

  if(sport) {
    const updatedSportList = sports.map(sport =>
      sport.id === id ? 
      {...sport, name, popularityRank} : sport
    );

    const upSport = updatedSportList.find(sport => sport.id === id); // Why this is all data?

    fs.writeFile("./data/sportsData.json", JSON.stringify(updatedSportList), (err) => {
      if(err){
        return res.status(500).json({
          status: "Fail",
          message: "Unable to write to file"
        });
      }else{
        const upSport = sports.find(sport => sport.id === id);
        return res.status(200).json({
          status: "Success",
          data: sport,
        });
      };
    })
  }else{
    res.status(404).json({
      status: "Fail",
      message: "Invalid sports ID",
    });
  };

  
}