module.exports = {
  '{USER:NEW}': function(message, cb) {
    var self = this;
    if (!self.config || !self.config.welcome) return;

    var user = message.user;

    self.__rpc('im.open', {
      user: user.id
    }, function(err, response) {
      if (!response || !response.channel || !response.channel.id) {
        return console.error('Invalid response:', err, response);
      }

      if (self.config.welcome instanceof Array) {
        var timing = 15000; // start timing (send first message 15 seconds in)
        var spacing = 15000; // interval between messages
        self.config.welcome.forEach(function(message) {
          setTimeout(function() {
            self.__say(response.channel.id, formatText(message));
          }, timing);
          timing += spacing;
        });
      } else {
        self.__say(response.channel.id, formatText(self.config.welcome));
      }
    });

    function formatText(input) {
      for (var id in self.channelMap) {
        var channel = self.channelMap[id];
        input = input.replace('{{channel:'+channel.name+'}}', '<#'+id+'>');
      }
      for (var id in self.userMap) {
        var user = self.userMap[id];
        input = input.replace('{{user:'+user.name+'}}', '<#'+id+'>');
      }
      input = input.replace('{{user}}', '<@'+user.id+'>');
      return input;
    }

  }
};
