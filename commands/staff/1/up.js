const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Topgg = require('@top-gg/sdk')

module.exports = {
    name: 'up',
    perm: '1',
execute(client, message, args){
        const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzMDE1NTc2NDg2NTY5NTc1NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjIzNDQ5MDU4fQ.vBtprLn_8gfXRBWLhBD6IQjZEtYBHzTAif6-Q_rs_oI')
        client.shard.fetchClientValues('guilds.cache.size').then(results => {
            api.postStats({ serverCount: `${results.reduce((acc, guildCount) => acc + guildCount, 0)}` })
            message.reply(`:white_check_mark: Sent ! \`${results.reduce((acc, guildCount) => acc + guildCount, 0)}\``)
        })
}
}


