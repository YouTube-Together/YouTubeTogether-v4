const fs = require("fs");
const { Collection, Intents, MessageEmbed, Client } = require("discord.js");
const Discord = require('discord.js')
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const db = require("quick.db");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

/**********************************************************************/
// Define All global client options
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.textCommands = new Collection();
client.staffCommands = new Collection();
client.config = require('./config/bot');
client.token = client.config.discord.token
client.db = db;


const slashCommands = fs.readdirSync("./commands/slash");

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./commands/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./commands/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const textCommands = fs.readdirSync("./commands/text");

for (const module of textCommands) {
	const commandFiles = fs
		.readdirSync(`./commands/text/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./commands/text/${module}/${commandFile}`);
		client.textCommands.set(command.name, command);
	}
}

const staffCommands = fs.readdirSync("./commands/staff");

for (const module of staffCommands) {
	const commandFiles = fs
		.readdirSync(`./commands/staff/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./commands/staff/${module}/${commandFile}`);
		client.staffCommands.set(command.name, command);
	}
}

const contextMenus = fs.readdirSync("./commands/context-menus");

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./commands/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./commands/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

const rest = new REST({ version: "9" }).setToken(client.token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		await rest.put(Routes.applicationCommands(client.config.discord.id), {
			body: commandJsonData,
		});
	} catch (error) {
		console.error(error);
	}
})();

function logEmbed(name, content){
    const webhook = new Discord.WebhookClient({ id: "857307075758915594", token: "UXH05d2vNzOiXQBV8ejGpI8gsd_Z0RajoVXI4e9LdYbHrhZ48yR_tLpEt3PRfJQahews" });
    webhook.send({
        username: name,
        avatarURL: `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`,
        embeds: [content]
    })
}

/**********************************************************************/

client.on('guildDelete', guild => {
	if (guild.id == "634089239923130388") return
	let embed = new MessageEmbed()
	.setColor("RED")
	.setAuthor(`Youtube Together - Logs`, `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`)
	.setDescription(`**• Name:** ${guild.name} \n**• Id:** ${guild.id} \n**• Members:** ${guild.memberCount}`)
	.setTimestamp()
	logEmbed(`Youtube Together - Leave`, embed)
	})
	
client.on('guildCreate', async guild => { 
	var chx = guild.channels.cache.filter(chx => chx.type === "GUILD_TEXT").find(x => x.position === 0);
	await chx.createInvite().then(i => {
		let embed = new MessageEmbed()
		.setColor("GREEN")
		.setAuthor(`Youtube Together - Logs`, `https://cdn.ytt-bot.xyz/img/1/watch_together_logo.png`)
		.setDescription(`
• **Name :** ${guild.name}
• **Id :** ${guild.id}
• **Members :** ${guild.memberCount}

• **Invite :** ||[Discord Server](https://discord.gg/${i.code})||
		`)
		.setThumbnail(guild.iconURL({ dynamic: true }))
		logEmbed(`Youtube Together - Join`, embed)
	})
	});


// Login into your client application with bot's token.

client.login(client.token);
