const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: 'support',
    description: 'Display the support server invite link',

    async execute(client, message, args) {

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
        await message.reply({
            embeds: [helpEmbed],
            components: [kool],
        });
    },
};
    