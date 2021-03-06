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
    var u = 0;
    var localNumbersPlayers = 0;
    var onlineNumbersPlayers;
    
    function calling() {
        //console.log("interval 1")
        try {
            let mcping = require('mc-ping-updated');
            //let ipmc = process.env.IPMC || process.argv[2]

            mcping("136.243.79.22", 25588, function(err, res) {
            if (err) {
              // Some kind of error
              console.log(err)
              client.user.setPresence({
              game: {
                  name: 'serveur fermer',
                  type: "PLAYING"
              }
              });
            } else {
              // Success!
              client.user.setPresence({
              game: {
                  name: res.players.online + " / " + res.players.max + ' connectés',
                  type: "STREAMING",
                  url: "https://www.twitch.tv/commentary"
              }
              });
              console.log("update " + u)
              u += 1;
              onlineNumbersPlayers = res.players.online;

              if(localNumbersPlayers < onlineNumbersPlayers){
                for (var i = localNumbersPlayers; i < onlineNumbersPlayers; i++) {
                  client.channels.get("513169582387757061").send({embed: {
                    color: 10157614,
                    description: "Un joueur vient de se connecter !"
                  }})
                  localNumbersPlayers += 1;
                }
              } else if(localNumbersPlayers > onlineNumbersPlayers){
                for (var i = localNumbersPlayers; i > onlineNumbersPlayers; i--) {
                  client.channels.get("513169582387757061").send({embed: {
                    color: 16657966,
                    description: "Un joueur vient de se déconnecter !"
                  }})
                  localNumbersPlayers -= 1;
                }
              }
              console.log("localNumbersPlayers=" + localNumbersPlayers + " | onlineNumbersPlayers=" + onlineNumbersPlayers)
            }
            });
        } catch (err) {
          console.log(err)
        }
    }
  //setInterval(calling,5000) // 24h = 86 400 000
  
  client.user.setPresence({
  game: {
      name: 'Je mange des gens',
      type: "PLAYING"
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
