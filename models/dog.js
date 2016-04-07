var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DogSchema = new Schema({
  name: String,
  image: String,
  //activityLog: {type: Schema.Types.OjectID, ref: 'ActivityLog'},
});

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;
