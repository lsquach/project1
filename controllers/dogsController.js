/************
 * DATABASE *
 ************/

var db = require('../models');



// GET /api/dogs
function index(req, res) {
  db.Dog.find({}, function(err, allDogs) {
    res.json(allDogs);
  });
}

function create(req, res) {
  db.Dog.create(req.body, function(err, dog) {
  if (err) { console.log('error', err); }
  console.log(dog);
  res.json(dog);
});
}

function show(req, res) {
  db.Dog.findById(req.params.dogId, function(err, foundDog) {
    if(err) { console.log('dogsController.show error', err); }
    console.log('dogsController.show responding with', foundDog);
    res.json(foundDog);
  });
}

function destroy(req, res) {
  db.Dog.findOneAndRemove({ _id: req.params.dogId }, function(err, foundDog){
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundDog);
  });
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Dog.findById(req.params.dogId, function(err, foundDog) {
    if(err) { console.log('dogsController.update error', err); }
    foundDog.name = req.body.name;
    foundDog.image = req.body.image;
    foundDog.save(function(err, savedDog) {
      if(err) { console.log('saving altered dog failed'); }
      res.json(savedDog);
    });
  });

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
