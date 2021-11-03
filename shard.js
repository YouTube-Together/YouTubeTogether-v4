/// declarations

const { ShardingManager, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const chalk = require("chalk");
let logo = `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`


/// functions

function logEmbed(name, content){
    const webhook = new Discord.WebhookClient({ id: "ID", token: "TOKEN"})
    webhook.send({
        username: name,
        avatarURL: `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`,
        embeds: [content]
    })
}


/// code

const manager = new ShardingManager('./index.js', {
    token: 'TOKEN', 
    totalShards: "auto",
    respawn: true, 
});

manager.spawn(manager.totalShards, 10000)
manager.on('shardCreate', /*async*/ (shard) => {
    console.log(chalk.red.bold(`[SHARDING] (${new Date().toString().split(" ", 5).join(" ")}) Shard #${shard.id + 1}: Active`))
    let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setAuthor(`Youtube Together - Logs`, logo)
    .setDescription(`**[LAUNCH]** #${shard.id + 1} launched !`)
    .setFooter(`${new Date().toString().split(" ", 5).join(" ")}`)
    logEmbed(`Youtube Together - Shard #${shard.id + 1}`, embed)
});
