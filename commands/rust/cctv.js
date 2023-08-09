const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cctv')
        .setDescription('Get CCTV names for different monuments')
        .addStringOption(option => 
            option.setName('monument')
                .setDescription('CCTV names for the chosen monument')
                .setRequired(true)
                .addChoices(
                    { name: 'Large Oil Rig', value: 'large' },
                    { name: 'Small Oil Rig', value: 'small' },
                    { name: 'Outpost', value: 'outpost' },
                    { name: 'Dome', value: 'dome' },
                    { name: 'Airfield', value: 'airfield' },
                    { name: 'Bandit Camp', value: 'bandit' },
                    { name: 'Underwater Lab', value: 'lab' },
                )),
    async execute(interaction) {
        const chosenMonument= interaction.options.getString("monument"); 
        
        const largeEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Large Oil Rig')
            .addFields(
                { name: 'Helipad', value: 'OILRIG2HELI' },
                { name: 'Dock', value: 'OILRIG2DOCK' },
                { name: 'Top Exhaust', value: 'OILRIG2EXHAUST' },
                { name: 'Level 1', value: 'OILRIG2L1' },
                { name: 'Level 2', value: 'OILRIG2L2' },
                { name: 'Level 3 A', value: 'OILRIG2L3A' },
                { name: 'Level 3 B', value: 'OILRIG2L3B' },
                { name: 'Level 4', value: 'OILRIG2L4' },
                { name: 'Level 5', value: 'OILRIG2L5' },
                { name: 'Level 6 A', value: 'OILRIG2L6A' },
                { name: 'Level 6 B', value: 'OILRIG2L6B' },
                { name: 'Level 6 C', value: 'OILRIG2L6C' },
                { name: 'Level 6 D', value: 'OILRIG2L6D' },
            );
            
        const smallEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Small Oil Rig')
            .addFields(
                {name: 'Helipad', value: 'OILRIG1HELI'},
                {name: 'Dock', value: 'OILRIG1DOCK'},
                {name: 'Top Exhaust', value: 'OILRIG1EXHAUST'},
                {name: 'Level 1', value: 'OILRIG1L1'},
                {name: 'Level 2', value: 'OILRIG1L2'},
                {name: 'Level 3', value: 'OILRIG1L3'},
                {name: 'Level 4', value: 'OILRIG1L4'},
            )

        const outpostEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Outpost')
            .addFields(
                {name: 'Street', value: 'COMPOUNDSTREET'},
                {name: 'Music', value: 'COMPOUNDMUSIC'},
                {name: 'Crude', value: 'COMPOUNDCRUDE'},
                {name: 'Chill', value: 'COMPOUNDCHILL'},
            )

        const domeEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Dome')
            .addFields(
                {name: 'Dome', value: 'DOME1'},
                {name: 'Top', value: 'DOMETOP'},
            )

        const airfieldEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Airfield')
            .addFields(
                {name: 'Helipad', value: 'AIRFIELDHELIPAD'},
            )

        const banditEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Bandit Camp')
            .addFields(
                {name: 'Casino', value: 'CASINO'},
                {name: 'Weapons', value: 'TOWNWEAPONS'},
            )

        const underwaterEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('CCTV names for Underwater Lab')
            .setDescription('The CCTV camera codes for Underwater Labs are procedurally generated.' +
                'This means that the available CCTV cameras for a given maps Underwater Lab monuments will depend' +
                'on what monuments were generated with their seed and map size.\n\n' + 
                'In addition to this, there are four-digit codes randomly generated and appended to each Underwater' + 
                'Labs CCTV cameras. To gain access to these randomly generated codes, you will need to access the' +
                'Underwater Labs CCTV Station module, which is found in a keycard locked room. Its possible for an Underwater'
                + 'Lab to not have one of these.')

        switch(chosenMonument) {
            case 'large':
                return await interaction.reply({ embeds: [largeEmbed] });
            case 'small':
                return await interaction.reply({ embeds: [smallEmbed] });
            case 'outpost':
                return await interaction.reply({ embeds: [outpostEmbed] });
            case 'dome':
                return await interaction.reply({ embeds: [domeEmbed] });
            case 'airfield':
                return await interaction.reply({ embeds: [airfieldEmbed] });
            case 'bandit':
                return await interaction.reply({ embeds: [banditEmbed] });
            case 'lab':
                return await interaction.reply({ embeds: [underwaterEmbed] });
        }
    },
};
