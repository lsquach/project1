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

function destroy(req, res) {
  db.Dog.findById(req.params.dogId, function(err, foundDog) {
    console.log(foundDog);
    // we've got the dog, now find the activity within it
    var correctActivity = foundDog.activityLog.id(req.params.activityLogId);
    if (correctActivity) {
      correctActivity.remove();
      // resave the dog now that the ac is gone
      foundDog.save(function(err, saved) {
        console.log('REMOVED ', correctActivity.name, 'FROM ', saved.activityLog);
        res.json(correctActivity);
      });
    } else {
      res.send(404);
    }
  });

}

function update(req, res) {
  db.Dog.findById(req.params.dogId, function(err, foundDog) {
    console.log(foundDog);
    // we've got the album, now find the song within it
    var correctActivity = foundDog.activityLog.id(req.params.activityLogId);
    if (correctActivity) {
      console.log(req.body);
      correctActivity.time = req.body.time;
      correctActivity.name = req.body.name;
      correctActivity.walked = req.body.walked;
      correctActivity.pooped = req.body.pooped;
      correctActivity.peed = req.body.peed;
      correctActivity.fed = req.body.fed;

      foundDog.save(function(err, saved) {
        console.log('UPDATED', correctActivity, 'IN ', saved.activityLog);
        res.json(correctActivity);
      });
    } else {
      res.send(404);
    }
  });

}

module.exports = {
  create: create,
  destroy: destroy,
  update: update
};
