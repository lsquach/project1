// dogsActivityLogsController
var db = require('../models');



// POST '/api/dogs/:dogId/activitylogs'
function create(req, res) {

  db.Dog.findById(req.params.dogId, function(err, foundDog) {
    console.log(req.body);
    //console.log(Object.keys(db))
    var newActivityLog = new db.ActivityLog(req.body);
    console.log('before ', foundDog);
    foundDog.activityLog.unshift(newActivityLog);
    foundDog.save(function(err, savedDog) {
      console.log('newActivityLog created: ', newActivityLog);
      res.json(newActivityLog);
    });
  });
}


module.exports = {
  create: create
};
