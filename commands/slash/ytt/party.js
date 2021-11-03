const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();
const fetch = require("node-fetch");


module.exports = {
	data: new SlashCommandBuilder()
		.setName("party")
		.setDescription("Create a youtube together party")
        .addChannelOption((option) => option.setName("channel").setDescription("Channel that you want to create the parties")),

	async execute(interaction) {
        if (!interaction.guild) return await interaction.editReply({
            content: ":x: | Please use this command in a guild",
            ephemeral: true,
        });

        let channel = interaction.member.voice.channel || interaction.options.getChannel('channel')
        if (!channel) return await interaction.editReply({
            content: ":x: | Please join a voice channel or choose a voice channel",
            ephemeral: true,
        });
        
        if (channel.type != "GUILD_VOICE") return await interaction.editReply({
            content: ":x: | Please join a voice channel or choose a voice channel",
            ephemeral: true,
        })

        if (!channel.permissionsFor(interaction.guild.me).has("CREATE_INSTANT_INVITE")) return await interaction.editReply({ content: ":x: | Please give the `CREATE_INSTANT_INVITE` permission", ephemeral: true })


        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "880218394199220334", 
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODMwMTU1NzY0ODY1Njk1NzU3.YHCkzQ.Vpnqdx8K1kyN9zybfVAIZ9ls47E`,
                "Content-Type": "application/json"  
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (invite.error || !invite.code) return interaction.editReply({ content: "❌ | Cannot create a **YouTube** party!", ephemeral: true}) 
                let pcreate = new MessageEmbed()
                    .setColor("RED")    
                    .setTitle("Party added !")
                    .setDescription(`Adding a **YouTube Together** party in [#${channel.name}](https://discord.gg/${invite.code}) \n> Click on the button bellow this message to join the party!`) 
                    .setFooter(`Added by ${interaction.member.user.tag}`, `${interaction.member.user.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()

                const kool = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel("Join Activity")
                        .setStyle("LINK")
                        .setURL(`https://discord.gg/${invite.code}`)
                        .setEmoji("889923392512360448")
                );

                interaction.editReply({
                    embeds: [pcreate],
                    components: [kool]
                });
            })
            .catch(e => {
                interaction.editReply("❌ | Cannot create a **YouTube** party!");
            })
	},
};
