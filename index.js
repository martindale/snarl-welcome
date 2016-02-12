module.exports = {
  '{USER}': function(user, cb) {
    var self = this;
    if (!self.config || !self.config.welcome) return;

    // simulate a real user delay
    setTimeout(function() {
      var knownUser = ~Object.keys(self.userMap).indexOf(user.id);
      if (!knownUser) {
        self.__rpc('im.open', {
          user: user.id
        }, function(err, response) {
          if (!response || !response.channel || !response.channel.id) {
            return console.error('Invalid response:', err, response);
          }

          if (self.config.welcome instanceof Array) {
            var timing = 0;
            var spacing = 15000;
            self.config.welcome.forEach(function(message) {
              setTimeout(function() {
                self.__say(response.channel.id, formatText(message));
              }, timing);
              timing += spacing;
            });
          } else {
            self.__say(response.channel.id, self.config.welcome);
          }
        });

      }
    }, 1000);

    function formatText(input) {
      for (var id in self.channelMap) {
        var channel = self.channelMap[id];
        input = input.replace('{{channel:'+channel.name+'}}', '<#'+id+'>');
      }
      for (var id in self.userMap) {
        var channel = self.userMap[id];
        input = input.replace('{{channel:'+channel.name+'}}', '<#'+id+'>');
      }
      input = input.replace('{{user}}', '<@'+user.id+'>');
      return input;
    }

  }
};
