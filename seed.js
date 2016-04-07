// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var dogList =[];
dogList.push({
              name: 'Franklin',
              image: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xpf1/v/t1.0-9/10985226_10102188058480217_1443609514444524365_n.jpg?oh=f2c66ec6952e5c05272041f488f0e3f9&oe=57B63BEB',
            });
dogList.push({
              name: 'Samson',
              image: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/11412436_10102272792243077_75801405203310469_n.jpg?oh=972cc68797a62796a586f64304cbaaa4&oe=5785BDDB',
            });

var activityLogList = [];
activityLogList.push({
              time: '6:00 pm',
              name: 'Daniel',
              walked: true,
              pooped: false,
              peed: true,
              fed: true
  });
  activityLogList.push({
                time: '7:00 am',
                name: 'Katie',
                walked: true,
                pooped: true,
                peed: true,
                fed: false
    });

// populate each albums song list
dogList.forEach(function(dog) {
  dog.activityLog = activityLogList;
});

db.Dog.remove({}, function(err, dogs){

  db.Dog.create(dogList, function(err, dogs){
    if (err) { return console.log('ERROR', err); }
    console.log("all dogs:", dogs);
    console.log("created", dogs.length, "dogs");
    process.exit();
  });

});
