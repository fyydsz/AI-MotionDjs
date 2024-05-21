const { SlashCommandBuilder } = require("discord.js");
const {
	EmbedBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ComponentType,
	PermissionFlagsBits,
} = require("discord.js");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("embed")
		.setDescription("Pesan embed")

		.addSubcommand((subcommand) => subcommand.setName("create").setDescription("Membuat pesan embed"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	category: "utility",
	usage: "/embed create",

	async execute(client, interaction) {
		const modal = new ModalBuilder().setCustomId("embedCreate").setTitle("Buat pesan Embed");

		// Add components to modal

		// Create the text input components
		const judul = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Judul")
			.setLabel("Judul pesan")
			.setStyle(TextInputStyle.Short);

		const deskripsi = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Deskripsi")
			.setLabel("Deskripsi pesan")
			.setStyle(TextInputStyle.Paragraph);

		const warna = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Warna")
			.setLabel("Warna")
			.setStyle(TextInputStyle.Short);

		const gambar = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("Gambar")
			.setLabel("Link gambar (opsional)")
			.setStyle(TextInputStyle.Short);

		const messageContent = new TextInputBuilder()
			.setRequired(false)
			.setCustomId("MessageContent")
			.setLabel("Message (content not embed)")
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(judul);
		const secondActionRow = new ActionRowBuilder().addComponents(deskripsi);
		const thirdActionRow = new ActionRowBuilder().addComponents(warna);
		const fourthActionRow = new ActionRowBuilder().addComponents(gambar);
		const fifthActionRow = new ActionRowBuilder().addComponents(messageContent);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
	},
};
