var Twitter = require('twitter');
var servo = require('./servo');

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
        console.log('there was error', error);
      });
    });
};

module.exports = getStream;
