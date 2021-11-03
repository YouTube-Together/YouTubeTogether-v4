const db = require("quick.db")
module.exports  = {
	name: "messageCreate",

	async execute(message) {
		if (!message.guild) return message.reply(":x: Please use this command in a guild.")
		const { client } = message;
		let prefix = "yt!"
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		if (message.content.toLocaleLowerCase().indexOf(prefix) == 0) {
					if (message.channel.permissionsFor(message.guild.me).has('READ_MESSAGE_HISTORY')) {
						if (message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) {
							const cmd = client.textCommands.get(command)
							const staffCmd = client.staffCommands.get(command)
							let permlvl = db.get(`${message.member.user.id}.rank.level`)
							if (!permlvl) permlvl = 9
							if (!cmd) {
								if (staffCmd) {
									if (permlvl == 7) {
										return message.reply(`:x: **Error :** You are not authorized to perform this command`)
									}
									if (permlvl == 8) {
										return message.reply(`:x: **Error :** You are not authorized to perform this command`)
									}
									if (permlvl == 9) {
										return message.reply(`:x: **Error :** You are not authorized to perform this command`)
									}
									if (permlvl > staffCmd.perm ) {
										return message.reply(`:x: **Error :** You are not authorized to perform this command \`\`\`Perm. Needed: ${staffCmd.perm}\nYours: ${permlvl}\`\`\``)
									} else return staffCmd.execute(client, message, args)
								} else return message.reply(':x: **Error :** This command doesn\'t exist')
							}
							if (cmd) {
								return cmd.execute(client, message, args);
							}
						} else {
							return message.reply(`:x: Please give me the \`EMBED_LINKS\` permission`)
						}
					} else {
						return message.reply(`:x: Please give me the \`READ_MESSAGE_HISTORY\` permission`)
			}
	}
	},
};




/*

1 -> Owner
2 -> Admin
3 -> Manager
4 -> Developer
5 -> Moderator
6 -> Bug Hunters
7 -> VIP
8 -> Premium

*/