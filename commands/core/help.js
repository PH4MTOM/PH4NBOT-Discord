const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display all the available commands')
        .addStringOption(option =>
            option.setName('commands')
                .setDescription('Choose betweem help information')
                .setRequired(true)
                .addChoices(
                    { name: 'General Commands', value: 'general' },
                    { name: 'Rust Commands', value: 'rust' },
                    { name: 'Music Commands', value: 'music' },
                )),
    async execute(interaction) {

        const chosenCommands = interaction.options.getString("commands");

        switch (chosenCommands) {
            case 'general':
                const generalEmbed = new EmbedBuilder()
                    .setColor('#0087FF')
                    .setTitle('PH4NBOT General Commands')
                    .setDescription('The following general commands are available')
                    .addFields(
                        { name: '/ping', value: 'Returns the bots ping to the server' },
                        { name: '/server', value: 'Returns information about the server' },
                        { name: '/user', value: 'Returns information about you' },
                        { name: '/hello', value: 'Hello reply from PH4NBOT :)' },
                    );
                return await interaction.reply({ embeds: [generalEmbed] })
            case 'music':
                const musicEmbed = new EmbedBuilder()
                    .setColor('#0087FF')
                    .setTitle('PH4NBOT Music Commands')
                    .setDescription('The following music commands are available')
                    .addFields(
                        { name: '/play (song)', value: 'Play the chosen song' },
                        { name: '/skip', value: 'Skip the currently playing song' },
                        { name: '/clear', value: 'Clear the queue' },
                        { name: '/queue', value: 'Display the current queue' },
                        { name: '/remove (index)', value: 'Remove a song from the queue with the choosen index'},
                        { name: '/move (song) (position)', value: 'Move a song to the choosen position' },
                        { name: '/stop', value: 'Stop the current music' },
                        { name: '/fuckoff', value: 'Stop the current music and leave the voice channel' },
                        { name: '/pause', value: 'Pause the current music' },
                        { name: '/resume', value: 'Resume the current music' },
                        { name: '/back', value: 'Play the previous song again' },
                        { name: '/save', value: 'Save the current song to your DMs' },
                        { name: '/lyrics', value: 'Show the lyrics of the current playing song' },
                        { name: '/shuffle', value: 'Shuffle the current queue' },
                        { name: '/nowplaying', value: 'Display the currently playing song' },
                    );
                return await interaction.reply({ embeds: [musicEmbed] });
            case 'rust':
                const rustEmbed = new EmbedBuilder()
                    .setColor('#0087FF')
                    .setTitle('PH4NBOT Rust Commands')
                    .setDescription('The following rust commands are available')
                    .addFields(
                        { name: '/boom (material) (type) (amount)', value: 'Calculates the amount of boom for X amount of material' },
                        { name: '/cctv (monument)', value: 'CCTV for chosen monument' },
                        { name: '/craft (item) (amount)', value: 'Calculates the x amount of materials needed for x amount of items' },
                        { name: '/raid', value: 'Display raiding cheat sheet' },
                        { name: '/code', value: 'Generates a random 4 digit code' },
                        { name: '/ip', value: 'IP for servers we are currently playing on' },
                    );
                return await  interaction.reply({ embeds: [rustEmbed] });
        }
    },
};