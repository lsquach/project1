var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/didhepoop-app");

module.exports.Dog = require("./dog.js");
module.exports.AcitvityLog = require("./activityLog.js");
