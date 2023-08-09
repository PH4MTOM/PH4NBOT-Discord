const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Bot roundtrip latency'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Pinging... :ping_pong: ', fetchReply: true});
        return interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms :computer:`);
    },
};