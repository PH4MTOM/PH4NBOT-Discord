const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with the user info'),
    async execute(interaction) {
        return await interaction.reply(`Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}\nYour created at: ${interaction.user.createdAt}\n`);
    },
};