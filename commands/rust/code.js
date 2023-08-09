const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('code')
        .setDescription('Generate a random 4 digit pin code.'),
    async execute(interaction) {
        const pin = Math.floor(1000 + Math.random() * 9000);
        return await interaction.reply(`Your pin code is: ${pin}`);
    },
};