const {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
} = require("discord.js");
const schedule = require("node-schedule");
const Schema = require("../../database/schema/dataAbsen")
const moment = require("moment")
moment.locale("id")

const momentTimezone = require("moment-timezone")

const rule = new schedule.RecurrenceRule();
rule.hour = 21;
rule.minute = 0;
rule.tz = 'Asia/Jakarta';

module.exports = {
	name: "ready",
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: `Welcome to the Project!` }], status: "idle" });
		
		schedule.scheduleJob(rule, async function(){
			const date = momentTimezone().tz("Asia/Jakarta").format("L")
			const data = await Schema.findOne({ date: `${date}` });

			let hadir = data.data.map((x, i) => {
				if (x.absent.type === "berhalangan") return null

				let user = client.users.cache.get(x.userId);
				user = user ? user.tag : "Invalid user (Left)";
				return `* **${user}** pada jam ${x.absent.time}`
			})

			hadir = hadir.filter(Boolean).join("\n")
			
			

			let berhalangan = data.data.map((x, i) => {
				if (x.absent.type === "hadir") return null
				
				let user = client.users.cache.get(x.userId);
				user = user ? user.tag : "Invalid user (left)";
				return `* **${user}** berhalangan, dengan alasan ${x.absent.alasan}`;
			})
			
			berhalangan = berhalangan.filter(Boolean).join("\n")

			let channel = client.channels.cache.get("1242020517574217793")
			channel.send(`List yang **__hadir__** di tanggal **${date}**:\n${hadir}\n\nList yang berhalangan:\n${berhalangan}`)
		})
	},
};
