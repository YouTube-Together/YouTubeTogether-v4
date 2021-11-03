const { MessageEmbed } = require("discord.js") 
module.exports = {
    name: 'servs',
    perm: '5',

execute(client, message, args){
        client.shard.fetchClientValues('guilds.cache.size')
            .then(results => {
                let embed1 = new MessageEmbed()
                .setColor("RED")
                .setAuthor("Youtube Together - Staff", client.config.discord.logo, client.config.support.invite)
                .setDescription(`I'm on **${results.reduce((acc, guildCount) => acc + guildCount, 0)}** guilds !`)
                message.reply({ embeds: [embed1]})
        }).catch(console.error);
    }
}
