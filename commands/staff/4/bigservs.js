const { MessageEmbed } = require("discord.js") 
module.exports = {
    name: 'servs',
    perm: '4',

execute(client, message, args){
        client.shard.fetchClientValues('guilds.cache.size')
            .then(results => {
                let embed1 = new MessageEmbed()
                let count = results.reduce((acc, guildCount) => acc + guildCount, 0)
                .setColor("RED")
                .setAuthor("Youtube Together - Staff", client.config.discord.logo, client.config.support.invite)
                .setDescription(`I'm on **${count}** guilds !`)
                message.reply({ embeds: [embed1]})
        }).catch(console.error);
    }
}

const BigGuilds = client.guilds.cache.filter(g => g.memberCount > 500).map(g => '`'+g.name+'`').join(", ");