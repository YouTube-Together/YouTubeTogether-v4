const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
require("dotenv").config();
const fetch = require("node-fetch");


module.exports = {
    name: 'party',
    description: 'Create a youtube together party',

	async execute(client, message, args) {
        if (!message.guild) return message.reply(":x: Please use this command in a guild.")

        let channel = message.member.voice.channel || message.guild.channels.cache.get(args[0])
        if (!channel) return message.reply(':x: Please join a voice channel or use my `Slash Commands`:ytt_slash:');
        
        if (channel.type != "GUILD_VOICE") return message.reply(':x: Please join a voice channel or use my `Slash Commands` <:ytt_slash:900119093099786270>');

        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.reply(":x: | Please give the `CREATE_INSTANT_INVITE` permission")


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
                if (invite.error || !invite.code) return message.reply("❌ | Cannot create a **YouTube** party!") 
                let pcreate = new MessageEmbed()
                    .setColor("RED")    
                    .setTitle("Party added !")
                    .setDescription(`Adding a **YouTube Together** party in [#${channel.name}](https://discord.gg/${invite.code}) \n> Click on the button bellow this message to join the party!`) 
                    .setFooter(`Added by ${message.member.user.tag}`, `${message.member.user.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()

                const kool = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setLabel("Join Activity")
                        .setStyle("LINK")
                        .setURL(`https://discord.gg/${invite.code}`)
                        .setEmoji("889923392512360448")
                );

                message.reply({
                    embeds: [pcreate],
                    components: [kool]
                });
            })
            .catch(e => {
                message.reply("❌ | Cannot create a **YouTube** party!");
            })
	},
};
