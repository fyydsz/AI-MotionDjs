const { owner } = require("../../config.json");
const { Events } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

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
} = require("discord.js");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		const { client } = interaction;

		if (!interaction.isModalSubmit()) return;
		if (interaction.customId === "embedCreate") {
			let judul = interaction.fields.getTextInputValue("Judul");
			let deskripsi = interaction.fields.getTextInputValue("Deskripsi");
			let warna = interaction.fields.getTextInputValue("Warna").toLowerCase();
			let gambar = interaction.fields.getTextInputValue("Gambar");
			let message = interaction.fields.getTextInputValue("MessageContent");

			if (judul === "") judul = null;
			if (deskripsi === "") deskripsi = null;
			if (warna === "kuning") warna = "#dbeb23";
			else if (warna === "biru") warna = "#237feb";
			else if (warna === "hijau") warna = "#33eb23";

			const hexRGB = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g;
			if (!warna.match(hexRGB))
				return interaction.reply({
					content: "Kamu memasukkan warna yang salah",
					ephemeral: true,
				});

			try {
				const embed = new EmbedBuilder().setTitle(judul).setDescription(deskripsi).setColor(warna);

				if (gambar === "") embed.setImage(null);
				else if (gambar.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i)) embed.setImage(gambar);

				if (message) {
					await interaction.deferReply({ ephemeral: true });
					wait(4000);
					interaction.editReply("Berhasil mengirim embed!");
					return interaction.channel.send({
						content: message,
						embeds: [embed],
					});
				} else {
					await interaction.deferReply({ ephemeral: true });
					wait(4000);
					interaction.editReply("Berhasil mengirim embed!");
					return interaction.channel.send({ embeds: [embed] });
				}
			} catch (e) {
				return console.log(e);
			}
		}
	},
};
