const fs = require("fs");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("Server is up.");
	console.log("Google trigger successfully.");
});

app.listen(8888, () => {
	console.log(`Ping telah diterima`);
});

const logger = require("./utils/logger");

const mongoose = require("mongoose");
const mongourl = process.env.MONGOURL

mongoose.connect(mongourl).then(() => console.log("Connection established to mongodb!"));

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, REST, Routes, Partials } = require("discord.js");
const path = require("node:path");
const { client_id, guild_id, prefix } = require("./config.json");

const token = process.env.TOKEN

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Event handler
// const eventsPath = path.join(__dirname, 'events');
// const eventFiles = fs
// 	.readdirSync("./events")
// 	.filter((file) => file.endsWith(".js"));

// for (const file of eventFiles) {
// 	const filePath = path.join(eventsPath, file);
// 	const event = require(filePath);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args))
// 	} else {
// 		client.on(event.name, (...args) => event.execute(...args))
// 	}
// }

const events = fs.readdirSync("./events");
for (const module of events) {
	const eventFiles = fs.readdirSync(`./events/${module}`).filter((file) => file.endsWith(".js"));

	for (const eventFile of eventFiles) {
		const event = require(`./events/${module}/${eventFile}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
}

// Collection commands
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.triggers = new Collection();

// Slash command
const slashCommands = fs.readdirSync("./commands");
for (const module of slashCommands) {
	const commandFiles = fs.readdirSync(`./commands/${module}`).filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./commands/${module}/${commandFile}`);
		if ("data" in command && "execute" in command) {
			client.slashCommands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${commandFile} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST({ version: "10" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	//...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(client_id), { body: commandJsonData });

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

// Log in to Discord with your client's token
client.login(token);

process.on("uncaughtException", (err) => {
	console.error(err);
	logger.error("Error!", err);
});

process.on("unhandledRejection", (err) => {
	console.error(err);
	logger.error("Error!", err);
});
