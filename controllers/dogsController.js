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
  // FILL ME IN !
}

function show(req, res) {
  // FILL ME IN !
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
