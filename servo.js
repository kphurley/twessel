var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1
var initial = 0;

servo.on('ready', function () {
  //var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

  //  Set the minimum and maximum duty cycle for servo 1.
  //  If the servo doesn't move to its full extent or stalls out
  //  and gets hot, try tuning these values (0.05 and 0.12).
  //  Moving them towards each other = less movement range
  //  Moving them apart = more range, more likely to stall and burn out
  servo.configure(servo1, 0.04, 0.15, function (err) {
    if(err) console.log(err);
  });
    /*setInterval(function () {
      console.log('Position (in range 0-1):', position);
      //  Set servo #1 to position pos.
      servo.move(servo1, position);

      // Increment by 10% (~18 deg for a normal servo)
      var increment = 0.3333333333333
      position += increment;
      if (position > 0.99) {
        position = (position % (increment * 3)); // Reset servo position
        console.log('heres the position ', position, 'heres our modulo ',(increment * 3))
      }
    }, 500); // Every 500 milliseconds*/
  });

servo.ourMove = function() {
  initial += 0.08;
  console.log('moving to position', initial);
  if(initial > 1) initial = 0;
  servo.move(servo1, initial);

}

function randomThing (min, max) {
  return Math.random() * (max-min) + min;
}

module.exports = servo;
