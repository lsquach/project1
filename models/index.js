var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/didhepoop-app");

module.exports.Dog = require('./dog');
//module.exports.AcitvityLog = require("./activityLog");
