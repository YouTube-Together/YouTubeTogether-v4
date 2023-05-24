const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Topgg = require('@top-gg/sdk')

module.exports = {
    name: 'up',
    perm: '1',
execute(client, message, args){
        const api = new Topgg.Api('')
        client.shard.fetchClientValues('guilds.cache.size').then(results => {
            api.postStats({ serverCount: `${results.reduce((acc, guildCount) => acc + guildCount, 0)}` })
            message.reply(`:white_check_mark: Sent ! \`${results.reduce((acc, guildCount) => acc + guildCount, 0)}\``)
        })
}
}


