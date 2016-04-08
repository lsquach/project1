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
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
