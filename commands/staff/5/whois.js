const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: 'whois',
    perm: '5',

execute(client, message, args){
    let user = args[0]
    if (!user) return message.reply(':x: **Error :** Please, specify the user id')
    if (isNaN(user)) return message.reply(':x: **Error :** Please, specify the user id')

    client.users.fetch(user).then((usr) => {
        let permlvl = db.get(`${user}.rank.level`)
        let staff = null
        if (!permlvl) permlvl = 9
        if (permlvl < 6) staff = "True" 
        if (permlvl < 6) staff = "False"
        if (permlvl == 9) permlvl = "9 - User" 
        if (permlvl == 8) permlvl = "8 - Premium" 
        if (permlvl == 7) permlvl = "7 - V.I.P"
        if (permlvl == 6) permlvl = "6 - Bug Hunter"
        if (permlvl == 5) permlvl = "5 - Moderator"
        if (permlvl == 4) permlvl = "4 - Developer"
        if (permlvl == 3) permlvl = "3 - Manager"
        if (permlvl == 2) permlvl = "2 - Admin"
        if (permlvl == 1) permlvl = "1 - Owner"

        let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Youtube Together - Whois")
        .setDescription(`**Username:** ${usr.tag}\n**Id:** ${usr.id}\n**Rank:** ${permlvl}\n**Staff:** ${staff}`)
        .setThumbnail(usr.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        const kool = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("DM")
                .setStyle("LINK")
                .setURL(`https://discord.com/channels/@me/${usr.id}`)
                .setEmoji("889923392512360448")
                .setDisabled(true)
        );

        message.reply({
            embeds: [embed],
            components: [kool]
        });
    })
    }
}