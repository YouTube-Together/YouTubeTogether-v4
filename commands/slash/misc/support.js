const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("support")
		.setDescription("Display the support server invite link"),

	async execute(interaction) {

		const helpEmbed = new MessageEmbed()
			.setColor("RED")
			.setTitle("**Youtube Together - Support**")
            .setDescription("Click on the button bellow this message!")

		const kool = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL("https://discord.gg/youtube-together")
                .setEmoji("889923042061484073")
		);
		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
