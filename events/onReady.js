const chalk = require("chalk");
const db = require("quick.db")
module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		client.user.setActivity("Youtube Together", { type: "WATCHING" })
		db.set('534131935719587850.rank.level', 1)
	},
};
