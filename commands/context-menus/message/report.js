const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
	data: {
		name: "Report message",
		type: 3, // 3 is for message context menus
	},

	async execute(interaction) {
		const query = interaction.options.getMessage("message");
        
		await interaction.deferReply();
		var chx = interaction.guild.channels.cache.filter(chx => chx.type === "GUILD_TEXT").find(x => x.position === 0);
		await chx.createInvite().then(i => {
			const embed = new MessageEmbed()
			.setColor("YELLOW")
			.setDescription(`**• Author:** ${interaction.member.user.tag}\n**• ID:** ${interaction.member.user.id}\n\n**• Guild:** ${interaction.guild.name}\n**• ID:** ${interaction.guild.id}\n**• Members:** ${interaction.guild.memberCount}\n\n**• Channel:** ${interaction.channel.name}\n**• ID:** ${interaction.channel.id}\n\n**• Link:** [Message Link](https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id})\n**• Invite:** [Invite Link](https://discord.gg/${i.code})\n\n**• Message:** \`\`\`${query}\`\`\``)
			.setTimestamp()
	
			const webhook = new Discord.WebhookClient({ id: "ID", token: "TOKEN"})
			webhook.send({
				username: 'Youtube Together - Report',
				avatarURL: `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`,
				embeds: [embed]
			})
		})
		interaction.editReply({
            content: "<:ytt_passed:889923651854557204> Message reported !",
            ephemeral: true,
        });
	},
};
