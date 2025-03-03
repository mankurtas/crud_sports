const { log } = require('console');
const fs = require('fs');
const {json} = require('stream/consumers');

const sports = JSON.parse(fs.readFileSync('./data/sportsData.json'));

exports.getAllSports = (req, res) => {
  res.status(200).json({
    status: "success",
    data: sports,
  });
};

exports.getSportByID = (req, res) => {
  const {id} = req.params;
  const sport = sports.find((sport) => sport.id === id );

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
};

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

exports.deleteSport = (req, res) => {
  const {id} = req.params;
  const sport = sports.find((sport) => sport.id === id );

  if(sport) {
    const updatedSports = sports.filter(sport => sport.id != id);

    fs.writeFile("./data/sportsData.json", JSON.stringify(updatedSports), (err) => {
      if(err){
        return res.status(500).json({
          status: "Fail",
          message: "Unable to write to file"
        });
      }else{
        return res.status(200).json({
          status: "Success",
          data: null,
        });
      };
    })
  }else{
    res.status(404).json({
      status: "Fail",
      message: "Invalid sports ID",
    });
  };
};