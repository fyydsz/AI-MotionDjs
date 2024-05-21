const wait = require("node:timers/promises").setTimeout;
const moment = require("moment")

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
		if (interaction.customId === "evalModal") {
			const code = interaction.fields.getTextInputValue("evalCodeInput");
			const clean = async (text) => {
				// If our input is a promise, await it before continuing
				if (text && text.constructor.name == "Promise") text = await text;

				// If the response isn't a string, `util.inspect()`
				// is used to 'stringify' the code in a safe way that
				// won't error out on objects with circular references
				// (like Collections, for example)
				if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });

				// Replace symbols with character code alternatives
				text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

				// Send off the cleaned up result
				return text;
			};

			let output;

			try {
                const evaled = eval(code)
				output = await clean(evaled);
                interaction.reply({ 
                    content: `\`\`\`js\n${output}\n\`\`\``,
                    ephemeral: true
                })

			} catch (error) {
				output = error.toString();
                interaction.reply ({
                    content: `\`ERROR\` \`\`\`xl\n${output}\n\`\`\``,
                    ephemeral: true
                })
                console.log(error)
			}
		}
	},
};
