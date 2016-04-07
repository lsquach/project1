var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActivityLogSchema = new Schema({
  time: String,
  walked: Boolean,
  pooped: Boolean,
  peed: Boolean,
  fed: Boolean
});

var Song = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = ActivityLog;
