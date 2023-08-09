const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boom')
        .setDescription('Calculating the about of boom you can craft for x amount of sulfur & gunpowder')
        .addStringOption(option =>
            option.setName('material')
                .setDescription('Calculating with choosen material')
                .setRequired(true)
                .addChoices(
                    { name: 'Sulfur', value: 'sulfur' },
                    { name: 'Gunpowder', value: 'gunpowder' },
                ))
        .addStringOption( option =>
                option.setName('type')
                .setDescription('Type of calculating')
                .setRequired(true)
                .addChoices(
                    { name: 'Straight', value: 'straight' },
                    { name: 'Row', value: 'row' },
                    { name: 'Box', value: 'box' },
                ))
        .addIntegerOption ( option =>
                option.setName('amount')
                .setDescription('Enter an amount')
                .setRequired(true)
            ),
    async execute(interaction) {
        const chosenMaterial = interaction.options.getString("material");
        const chosenType = interaction.options.getString("type");
        let chosenAmount = interaction.options.getInteger("amount");

        //Calculating all chosenAmounts as raw sulfur
        if(chosenMaterial === 'sulfur') {
            switch(chosenType) {
                case 'row':
                    chosenAmount = chosenAmount * 6000;
                    break;
                case 'box':
                    chosenAmount = chosenAmount * 30000;
                    break;
            }
        } else {
            switch(chosenType) {
                case 'row':
                    chosenAmount = chosenAmount * 12000;
                    break;
                case 'box':
                    chosenAmount = chosenAmount * 60000;
                    break;
                case 'straight':
                    chosenAmount = chosenAmount * 2;
            }
        }

        //Calculating raiding supplies
        if(chosenMaterial === 'gunpowder') {
            rocket = Math.floor(chosenAmount / 1300);
            c4 = Math.floor(chosenAmount / 2000);
        } else {
            rocket = Math.floor(chosenAmount / 1400);
            c4 = Math.floor(chosenAmount / 2200);
        }
        hvRocket = Math.floor(chosenAmount / 200);
        incenRocket = Math.floor(chosenAmount / 610);
        explosiveAmmo = Math.floor(chosenAmount / 50);
        satchel = Math.floor(chosenAmount / 480);
        
        picture = 'https://craftpedia.net/img/caches/rust/sulfur/sulfur_512x512.webp'

        if(chosenMaterial === 'gunpowder') {
            chosenAmount = chosenAmount / 2
            picture = 'https://craftpedia.net/img/caches/rust/gunpowder/gunpowder_512x512.webp'
        }

        const boomEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`For ${chosenAmount} ${chosenMaterial} you can craft`)
            .setThumbnail(`${picture}`)
            .addFields(
                { name: 'Rocket:', value: `${rocket}` },
                { name: 'HV Rocket:', value: `${hvRocket}` },
                { name: 'Incendiary Rocket:', value: `${incenRocket}` },
                { name: 'C4:', value: `${c4}` },
                { name: 'Satchel:', value: `${satchel}` },
                { name: 'Explosive Ammo:', value: `${explosiveAmmo}` },
            )
        return await interaction.reply({ embeds: [boomEmbed] });
    }
}