const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with the server info'),
    async execute(interaction) {
        return await interaction.reply(`Server name: ${interaction.guild.name}\nServer ID: ${interaction.guild.id}\nTotal members: ${interaction.guild.memberCount}\nServer Created at: ${interaction.guild.createdAt}\n`);
    },
};