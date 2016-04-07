var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActivityLogSchema = new Schema({
  time: String,
  name: String,
  walked: Boolean,
  pooped: Boolean,
  peed: Boolean,
  fed: Boolean
});

var ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = ActivityLog;
