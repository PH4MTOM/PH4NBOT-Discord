const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube')
        .addStringOption(option=>
            option.setName('query')
                .setRequired(true)
                .setDescription('Enter link or song name')
        ),
    async execute(interaction, player) {
        const channel = interaction.member.voice.channel;
        if (!channel) {
            return interaction.reply({ content: 'You are not connected to a voice channel!', ephemeral: true });
        }
        const query = interaction.options.getString('query', true);

        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEmpty: true,
                    leaveOnEnd: false,
                    leaveOnStop: false,
                    selfDeaf: true,
                    volume: 50,
                    connectionTimeout: 30000
                }
            });
            const queueSongEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Added to queue`)
                .setDescription(`__${track.title}__`)
                .setThumbnail('https://c.tenor.com/Ziew1c0_mKUAAAAC/pepe-frog.gif')
                .addFields(
                    {
                        name: 'Author',
                        value: `${track.author}`,
                        inline: true
                    },
                    {
                        name: 'Duration',
                        value: `${track.duration}`,
                        inline: true,
                    }
                );
            track.requestedBy = interaction.member.user.tag;
            return interaction.followUp({embeds: [queueSongEmbed], ephemeral: true });
        } catch (err) {
            return interaction.followUp({content:`Something went wrong: ${err}`, ephemeral: true })
        }
    }
}