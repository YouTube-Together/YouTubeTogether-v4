const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Display the invite link"),

	async execute(interaction) {

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
		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
