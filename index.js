// Mise en place des en tetes
const discord = require('discord.js')
const client = new discord.Client()
const config = require('./config.json')

// On start le bot
client.on('ready', () => {

    function calling() {
        console.log("interval 1")
        try {
            let mcping = require('mc-ping');
            let ipmc = process.env.IPMC || process.argv[2]

            mcping(ipmc, 25600, function(err, res) {
            if (err) {
              // Some kind of error
              client.user.setActivity('Serveur fermer', { type: "LISTENING" })
            } else {
              // Success!
              client.user.setActivity('' + res.num_players + ' / ' + res.max_players + ' connectés', { type: "LISTENING" })
            }
            }, 3000);
        } catch (err) {
          console.log(err)
        }
    }
  setInterval(calling,200) // 24h = 86 400 000
  client.user.setActivity('Hey !', { type: "LISTENING" })
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
    console.log(command)
    let commandFile = require(`./module/${command}.js`)
    commandFile.run(client, message, args)
  } catch (err) {

  }
})

var dt = process.env.TOKEN2 || process.argv[2]

if (!dt) {
  console.log('')
}

client.login(dt);