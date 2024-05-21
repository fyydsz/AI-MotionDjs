const {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Check the bot uptime")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	category: "utility",
	usage: "/uptime",

	async execute(client, interaction) {
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);

		let uptime = `**${days} days**, **${hours} hours**, **${minutes} minutes**, and **${seconds} seconds**`;
		interaction.reply(`I have online for ${uptime}`);
	},
};
