const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'playerStart',
    execute(player) {
        // this event is emitted whenever discord-player starts to play a track
        player.events.on('playerStart', (queue, track) => {
            const playingEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Playing ${track.title}`)
                .setThumbnail('https://acegif.com/wp-content/uploads/2021/4fh5wi/pepefrg-4.gif')
                .setURL(track.url)
                .addFields(
                    {
                        name: 'Author',
                        value: `${track.author}`,
                        inline: true
                    },
                    {
                        name: 'Duration',
                        value: `${track.duration}`,
                        inline: true
                    },
                    {
                        name: 'Requested by',
                        value: `${track.requestedBy}`,
                    },
                )
                .setImage(track.thumbnail)
                .setTimestamp();

            queue.metadata.channel.send({ embeds:[playingEmbed] });
        });
    }
}
