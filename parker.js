const fs = require("fs");
const { Collection, Intents, MessageEmbed, Client } = require("discord.js");
const Discord = require('discord.js')
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const db = require("quick.db")
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

client.config = require('./config/bot');

const express = require('express')
const app = express() // Your express app
const Topgg = require('@top-gg/sdk')

const webhook = new Topgg.Webhook('AUTORIZATION') // add your top.gg webhook authorization (not bot token)

app.post('/topgg', webhook.listener(vote => {
  client.users.fetch(vote.user).then((usr) => {
      db.add(`${usr.id}.upvote.count`, 1)
    let embed = new MessageEmbed()
    .setColor("RED")
    .setAuthor('Youtube Together - Upvote', client.config.discord.logo, 'https://top.gg/bot/830155764865695757/vote')
    .setDescription(`Thank you very much for your vote, **${usr.tag}** \`[${db.get(`${usr.id}.upvote.count`)} upvotes]\`\n*[Click here](https://top.gg/bot/830155764865695757/vote) to uptvote!*`)
    .setFooter(`ID: ${usr.id}`, usr.displayAvatarURL({ dynamic: true}))
    .setTimestamp()
    const webhook = new Discord.WebhookClient({ id: "ID", token: "TOKEN" })
    webhook.send({
        username: `YouTube Together`,
        avatarURL: `${client.config.discord.logo}`,
        content: `<@${usr.id}>`,
        embeds: [embed]
    })
  })
})) // attach the middleware

app.listen(3232) // your port

client.login("TOKEN")
