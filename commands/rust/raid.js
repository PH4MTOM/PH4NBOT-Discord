const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('raid')
        .setDescription('Display raiding cheat sheet'),
    async execute(interaction) {
        return await interaction.reply('https://gameplay.tips/uploads/posts/2020-03/1584624105_1.jpg');
    },
};