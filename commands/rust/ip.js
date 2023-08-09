const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Get the IPs we are currently playing on.'),
    async execute(interaction) {
        const ipEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('IP for the servers we play on')
            .addFields(
                { name: 'Survivors.gg #4 [ 2x Solo - Quad ] | Wipe: Thursday 14:00', value: 'client.connect 209.237.141.76:28015' },
                { name: 'Survivors.gg Large [ 2x Vanilla ] | Wipe: Thursday 16:00', value: 'client.connect 209.237.141.10:28015' },
                { name: '[EU] Rustoria.co - 2x Vanilla | Wipe: Monday & Thursday 16:00', value: 'client.connect 205.178.168.128:28015' },
            )
            .setFooter({
                text: 'This is an automated message. Please do not reply.'
            });
        return await interaction.reply ({ embeds: [ipEmbed] });
    },
};