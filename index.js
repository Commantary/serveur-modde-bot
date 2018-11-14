// Mise en place des en tetes
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')
var dt = process.env.TOKEN2 || process.argv[2]
var ipmc = process.env.IPMC || process.argv[2]
if (!dt) {
  console.log('')
}

// On start le bot
client.on('ready', () => {
    var i = 0;
    function calling() {
        //console.log("interval 1")
        try {
            let mcping = require('mc-ping-updated');
            //let ipmc = process.env.IPMC || process.argv[2]

            mcping("62.4.9.216", 25600, function(err, res) {
            if (err) {
              // Some kind of error
              console.log(err)
              client.user.setPresence({
              game: {
                  name: 'serveur fermer',
                  type: "STREAMING",
                  url: "https://www.twitch.tv/commentary"
              }
              });
            } else {
              // Success!
              console.log(res)
              client.user.setPresence({
              game: {
                  name: res.players.online + " / " + res.players.max + ' connectés',
                  type: "STREAMING",
                  url: "https://www.twitch.tv/commentary"
              }
              });
              console.log("update " + i)
              i += 1;
              if(i>99){
                client.destroy()
                client.login(dt)
                i = 0;
              }
            }
            }, 6000);
        } catch (err) {
          console.log(err)
        }
    }
  setInterval(calling,3000) // 24h = 86 400 000
  client.user.setPresence({
  game: {
      name: 'Connected',
      type: "STREAMING",
      url: "https://www.twitch.tv/commentary"
  }
  });
  console.log('-------------------------------------')
  console.log('     [!] BOT connecté [!]     ')
  console.log('-------------------------------------')
  console.log('le prefix est: ' + config.prefix)
})

client.on('message', message => {

  if (message.author.bot) return
  if (message.content.indexOf(config.prefix) !== 0) return

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  // The list of if/else is replaced with those simple 2 lines:
  try {
    console.log(command + " from " + message.author.username)
    let commandFile = require(`./module/${command}.js`)
    commandFile.run(client, message, args)
  } catch (err) {

  }
})



client.login(dt);