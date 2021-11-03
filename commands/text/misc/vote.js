const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	data: 'vote',
	description: 'Display the vote link',

	async execute(client, message, args) {

		const helpEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("**Youtube Together - Vote**")
            .setDescription("Click on the button bellow this message!")

		const kool = new MessageActionRow().addComponents(
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
