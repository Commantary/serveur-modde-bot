//const ping = require ("net-ping");

module.exports.run = async (client, message, args) => {
	console.log("HEY")
 
	mcping = require('mc-ping');
	var ipmc = process.env.IPMC || process.argv[2]
	
	mcping(ipmc, 25600, function(err, res) {
		if (err) {
			// Some kind of error
			console.error(err);
			message.channel.send({embed: {
				color: 3067130,
				description: "Le serveur n'est pas ouvert"
			}})
		} else {
			// Success!
			console.log(res);
			message.channel.send({embed: {
				color: 3067130,
				title: res.server_name,
				description: "SERVEUR OUVERT",
				fields: [{
				name: "Joueurs connectés:",
				value: res.num_players + " / " + res.max_players
				},
				{
					name: "Version:",
					value: res.minecraft_version
				}
				]
			}})
		}
	}, 3000);
}