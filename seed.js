// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var dogList =[];
dogList.push({
              name: 'Franklin',
              image: 'https://scontent.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/12985394_10102741873435607_282708623077513920_n.jpg?oh=654541bbdc2797d2c66748f347683a30&oe=57B98FBB',
            });
dogList.push({
              name: 'Samson',
              image: 'https://scontent.xx.fbcdn.net/hphotos-xla1/v/t1.0-9/12961583_10102741850741087_4012380804591548298_n.jpg?oh=10210ddbe9c230045693dafa58c90177&oe=57B3CED0',
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
