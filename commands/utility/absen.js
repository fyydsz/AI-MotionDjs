const {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
    ButtonStyle,
} = require("discord.js");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("absen")
		.setDescription("ini embed absensinya")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	category: "utility",
	usage: "/absensi",

	async execute(client, interaction) {
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("absen")
            .setLabel("Absen di sini!")
            .setStyle(ButtonStyle.Primary)
        )

        const embed = new EmbedBuilder()
			.setColor('#33eb23')
			.setTitle('Absensi Member AI Motion')
			.setDescription('Mohon untuk pencet tombol dibawah untuk absen!')
		
		await interaction.reply({ content: "Embed sudah dikirim!", ephemeral: true })
        await interaction.channel.send({ embeds: [embed], components: [button] })
    
    },
};
