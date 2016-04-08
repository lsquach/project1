var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/didhepoop-app");

module.exports.Dog = require('./dog.js');
module.exports.ActivityLog = require("./activityLog.js");
