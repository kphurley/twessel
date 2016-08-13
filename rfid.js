// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic RFID example listens for an RFID
device to come within range of the module,
then logs its UID to the console.
*********************************************/

var tessel = require('tessel');
var rfidlib = require('rfid-pn532');
//var getStream = require('./twitter-stream');

var rfid = rfidlib.use(tessel.port['B']);

var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1
var initial = 0;
var running = false;

var Twitter = require('twitter');

var twitterClient = new Twitter({
  consumer_key: 'nsbcdeNl4ejOSaG7iG49ioWUQ',
  consumer_secret: 'dB0JxhI4OAqenirVPqbWq2R7krlpC168EMQG2vjGKKAS1aSEWC',
  access_token_key: '22174323-xiMuRhGPZAhWxqP5OG7zXE3dcu6vasFVsj5eQ4PR6',
  access_token_secret: 'LsPpgkngLcCO6rjGxkM3yeGOUoFrk9OjXTLEbi2IZPHi9'
});

var getStream = function(topic){
    console.log('Listening on twitter!')

    twitterClient.stream('statuses/filter', {track: topic}, function(stream) {
      stream.on('data', function(event) {
          //DO SOMETHING COOL WITH THE TWITTER DATA
        console.log(event.user.screen_name +': '+ event.text);
          servo.ourMove();
      });

      stream.on('error', function(error) {
        console.log('therer was error', error);
      });
    });
};

servo.on('ready', function () {
    console.log('servo is ready!');

  servo.configure(servo1, 0.05, 0.12, function (err) {
        if(err) console.log(err);
        servo.move(servo1, 0);
    });
  });

servo.ourMove = function() {
   console.log('About to move!');
  initial += 0.05;
  if(initial > 1) initial = randomThing(0.85, 0.99);
  servo.move(servo1, initial);
}

function randomThing (min, max) {
  return Math.random() * (max-min) + min;
}



rfid.on('ready', function (version) {
  console.log('Ready to read RFID card');

  rfid.on('data', function(card) {

    //console.log(card);

    if(!running) {
        running = true;
        getStream('fullstack');
    }
  });
});

rfid.on('error', function (err) {
  console.error(err);
});
