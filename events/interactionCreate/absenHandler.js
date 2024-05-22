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

const Schema = require("../../database/schema/dataAbsen");
const moment = require("moment-timezone");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		if (!interaction.isButton()) return;

		if (interaction.customId === "absen") {
			const date = moment().tz("Asia/Jakarta").format("L");
			const data = await Schema.findOne({ date: `${date}` });
			if (!data) {
				const modal = new ModalBuilder().setCustomId("absenModal").setTitle("Absensi");

				const keterangan = new TextInputBuilder()
					.setCustomId("inputKeterangan")
					.setLabel("Keterangan")
					.setPlaceholder("Hadir / Berhalangan")
					.setStyle(TextInputStyle.Short)
					.setRequired(true);

				const alasan = new TextInputBuilder()
					.setCustomId("inputAlasan")
					.setLabel("Alasan")
					.setPlaceholder("Tuliskan keterangan jika berhalangan!")
					.setStyle(TextInputStyle.Paragraph)
					.setRequired(false);

				const first = new ActionRowBuilder().addComponents(keterangan);
				const second = new ActionRowBuilder().addComponents(alasan);

				modal.addComponents(first, second);
				interaction.showModal(modal);
			} else if (data) {
				let userid = data.data.map((x) => {
					return `${x.userId}`;
				});

				if (userid.includes(interaction.user.id)) return interaction.reply({  content: "Anda sudah absen!", ephemeral: true });

				const modal = new ModalBuilder().setCustomId("absenModal").setTitle("Absensi");

				const keterangan = new TextInputBuilder()
					.setCustomId("inputKeterangan")
					.setLabel("Keterangan")
					.setPlaceholder("Hadir / Berhalangan")
					.setStyle(TextInputStyle.Short)
					.setRequired(true);

				const alasan = new TextInputBuilder()
					.setCustomId("inputAlasan")
					.setLabel("Alasan")
					.setPlaceholder("Tuliskan keterangan jika berhalangan!")
					.setStyle(TextInputStyle.Paragraph)
					.setRequired(false);

				const first = new ActionRowBuilder().addComponents(keterangan);
				const second = new ActionRowBuilder().addComponents(alasan);

				modal.addComponents(first, second);
				interaction.showModal(modal);
			}
		}
	},
};
