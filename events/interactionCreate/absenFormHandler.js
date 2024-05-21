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
const moment = require("moment");
moment.locale("id");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;

		if (interaction.customId === "absenModal") {
			const keterangan = interaction.fields.getTextInputValue("inputKeterangan").toLowerCase();
			const alasan = interaction.fields.getTextInputValue("inputAlasan").toLowerCase();

			const date = moment().format("L");
			const time = moment().format("LT");

			if (keterangan === "hadir".toLowerCase()) {
				const data = await Schema.findOne({ date: `${date}` });
				const filter = { date: `${date}` };
				if (!data) {
					new Schema({
						date: `${date}`,
						data: [
							{
								username: interaction.user.username,
								userId: interaction.user.id,
								absent: {
									type: "hadir",
									time: `${time}`,
								},
							},
						],
					}).save();
				} else if (data) {
					const update = {
						$push: {
							data: {
								username: interaction.user.username,
								userId: interaction.user.id,
								absent: {
									type: "hadir",
									time: `${time}`,
								},
							},
						},
					};
					await Schema.updateOne(filter, update);
					await interaction.reply({ content: "Terima kasih sudah absen.", ephemeral: true });
				}
			} else if (keterangan === "berhalangan".toLowerCase()) {
				const data = await Schema.findOne({ date: `${date}` });
				const filter = { date: `${date}` };
				if (!data) {
					new Schema({
						date: `${date}`,
						data: [
							{
								username: interaction.user.username,
								userId: interaction.user.id,
								absent: {
									type: "berhalangan",
									time: `${time}`,
									alasan: `${alasan}`,
								},
							},
						],
					});
				} else if (data) {
					const update = {
						$push: {
							data: {
								username: interaction.user.username,
								userId: interaction.user.id,
								absent: {
									type: "berhalangan",
									time: `${time}`,
									alasan: `${alasan}`,
								},
							},
						},
					};
					await Schema.updateOne(filter, update);
					await interaction.reply({ content: "Terima kasih sudah absen.", ephemeral: true });
				}
			} else {
				await interaction.reply({
					content: 'Keterangannya hanya "Hadir" dan "Berhalangan"',
					ephemeral: true,
				});
			}
		}
	},
};
