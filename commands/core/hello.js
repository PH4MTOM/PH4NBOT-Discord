const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('The bot will say hello to you'),
    async execute(interaction) {
        return await interaction.reply(`Hello! :) <@${interaction.member.id}>`);
    }
}