// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var dogList =[];
dogList.push({
              name: 'Franklin',
              image: '1994, March 8',
            });
dogList.push({
              name: 'Samson',
              image: '1994, March 8',
            });


db.Dog.remove({}, function(err, dogs){

  db.Dog.create(dogList, function(err, dogs){
    if (err) { return console.log('ERROR', err); }
    console.log("all dogs:", dogs);
    console.log("created", dogs.length, "dogs");
    process.exit();
  });

});
