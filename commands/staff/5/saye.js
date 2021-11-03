const { MessageEmbed } = require("discord.js") 
module.exports = {
    name: 'saye',
    perm: '5',

execute(client, message, args){

    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(args.join(" "))
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .setTimestamp()
    message.delete()
    message.channel.send({ embeds: [embed] })
}
}