const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: 'help',
	description: 'Display all the commands of the bot',

	async execute(client, message, args) {
		const commands = client.textCommands;

		const helpEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("**Youtube Together - Help**");

		commands.map((command) =>
			helpEmbed.addField(
				command.name,
				command.description,
				true
			)
		);
		const kool = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Website")
				.setStyle("LINK")
				.setURL("https://ytt-bot.xyz")
				.setEmoji("889923165319462913"),
            new MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL("https://discord.gg/youtube-together")
                .setEmoji("889923042061484073"),
            new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL("https://discord.com/api/oauth2/authorize?client_id=830155764865695757&permissions=377974279233&scope=bot%20applications.commands")
                .setEmoji("889923165319462913"),
            new MessageButton()
                .setLabel("Vote")
                .setStyle("LINK")
                .setURL("https://top.gg/bot/830155764865695757/vote")
                .setEmoji("889923264036610128")
		);
		await message.reply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
