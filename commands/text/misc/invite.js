const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: 'invite',
	description: 'Display the invite link',

	async execute(client, message, args) {

		const helpEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("**Youtube Together - Invite**")
            .setDescription("Click on the button bellow this message!")

		const kool = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL("https://discord.com/api/oauth2/authorize?client_id=830155764865695757&permissions=377974279233&scope=bot%20applications.commands")
                .setEmoji("889923165319462913")
		);
		await message.reply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
