module.exports = {
    name: 'list',
    perm: '5',

execute(client, message, args){
    client.shard
	.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
	.then(results => {
		return message.reply(`**${results.reduce((acc, memberCount) => acc + memberCount, 0)}** users !`);
	})
	.catch(console.error);
}
}