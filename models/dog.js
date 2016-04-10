var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActivityLog = require('./activityLog');


var DogSchema = new Schema({
  name: String,
  image: String,
  activityLog: [ActivityLog.schema],
});

DogSchema.set('versionKey', false);

var Dog = mongoose.model('Dog', DogSchema);

module.exports = Dog;
