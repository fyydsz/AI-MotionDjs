const { owner } = require("../../config.json");
const { Events } = require("discord.js");
const logger = require("../../utils/logger");

module.exports = {
	name: "interactionCreate",

	// Event ini mengeksekusi ketika ada command dan menghandle nya
	async execute(interaction) {
		const { client } = interaction;

		// Check kalau interactionnya itu command (prevent bugs)
		if (!interaction.isCommand()) return;
		const command = client.slashCommands.get(interaction.commandName);

		// Check kalau slash ini yang mengeksekusinya adalah member
		if (command.ownerOnly && !owner.includes(interaction.member.id)) {
			return interaction.reply({
				content: "oops, hanya developer yang bisa mengakses command ini.",
				ephemeral: true,
			});
		}

		if (!command) return;

		// Mengeksekusi slash command
		try {
			await command.execute(client, interaction);
		} catch (err) {
			logger.error("Error!", err);
			console.error(err);
			await interaction.reply({
				content: "Sepertinya ada masalah saat menjalankan command tersebut\nHarap hubungi developer.",
				ephemeral: true,
			});
		}
	},
};
