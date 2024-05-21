const {
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	SlashCommandBuilder,
	PermissionFlagsBits,
    ModalBuilder,
    TextInputAssertions,
    TextInputBuilder,
    TextInputStyle,
} = require("discord.js");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("Command berbahaya")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	category: "utility",
	usage: "/uptime",
    ownerOnly: true,

	async execute(client, interaction) {
		const modal = new ModalBuilder()
            .setCustomId("evalModal")
            .setTitle("Eval Codes")
        
        const code = new TextInputBuilder()
            .setCustomId("evalCodeInput")
            .setLabel("Code")
            .setPlaceholder("console.log(\"Hello World\")")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)

        const first = new ActionRowBuilder().addComponents(code)
        modal.addComponents(first);

        await interaction.showModal(modal);
	},
};
