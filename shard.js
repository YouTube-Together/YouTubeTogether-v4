/// declarations

const { ShardingManager, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const chalk = require("chalk");
let logo = `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`


/// functions

function logEmbed(name, content){
    const webhook = new Discord.WebhookClient({ id: "857307075758915594", token: "UXH05d2vNzOiXQBV8ejGpI8gsd_Z0RajoVXI4e9LdYbHrhZ48yR_tLpEt3PRfJQahews"})   //("857307075758915594", "UXH05d2vNzOiXQBV8ejGpI8gsd_Z0RajoVXI4e9LdYbHrhZ48yR_tLpEt3PRfJQahews");
    webhook.send({
        username: name,
        avatarURL: `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`,
        embeds: [content]
    })
}


/// code

const manager = new ShardingManager('./index.js', {
    token: 'ODMwMTU1NzY0ODY1Njk1NzU3.YHCkzQ.Vpnqdx8K1kyN9zybfVAIZ9ls47E', 
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
