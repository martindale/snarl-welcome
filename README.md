# snarl-welcome
Plugin for snarl that presents some information to new users.

## Installation
To install the Welcome plugin, simply execute the following in your bot's
primary folder:

```
npm install snarl-welcome
```

Finally, add the following values to `config/index.json`:

```json
{
  "name": "snarl",
  "plugins": ["welcome"], // add the "welcome" plugin here
  "store": "data/store",
  "slack": {
    "token": "xoxb-1337-some-token"
  },
  "welcome": "Hello there, {{user}}!  Welcome to the community.", // modify to suit your needs
  "debug": false
}
```

If you'd like, you can even include an array of messages:

```json
{
  "name": "snarl",
  "plugins": ["welcome"], // add the "welcome" plugin here
  "store": "data/store",
  "slack": {
    "token": "xoxb-1337-some-token"
  },
  "welcome": [
    "Hey there, {{user}}!",
    "Welcome to the community."
  ],
  "debug": false
}
```

## Configuration
The Welcome plugin supports a special syntax for linking users and channels.
Simply use the following structure in your message:

```
{{channel:SOME_CHANNEL_NAME}}
```

That's all there is to it.  Enjoy!
