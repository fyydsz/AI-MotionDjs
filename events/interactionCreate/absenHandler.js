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
const moment = require("moment")
moment.locale("id")

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
        if (!interaction.isButton()) return

        if (interaction.customId === "absen") {
            const date = moment().format("L");
			const data = await Schema.findOne({ date: `${date}` });
            const userId = data.data.map((x) => {
                return x.userId;
            })
            
            if (userId.includes(interaction.user.id)) return interaction.reply({ content: "Kamu sudah absen, silahkan absen kembali besok", ephemeral: true })

            const modal = new ModalBuilder()
                .setCustomId("absenModal")
                .setTitle("Absensi")
            
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
            const second = new ActionRowBuilder().addComponents(alasan)
            
            modal.addComponents(first, second);
            await interaction.showModal(modal);
        }
    }
}