const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('craft')
        .setDescription('Calculate the amount needed for crafting x amount of a certain item')
        .addStringOption( option => 
            option.setName('item')   
                .setDescription('Item to be crafted')
                .setRequired(true)
                .addChoices(
                    { name: 'Rocket', value: 'rocket' },
                    { name: 'Hv Rocket', value: 'hvRocket' },
                    { name: 'Incendiary Rocket', value: 'incenRocket' },
                    { name: 'C4', value: 'c4' },
                    { name: 'Satchel', value: 'satchel' },
                    { name: 'Explosive Ammo', value: 'exploAmmo' },
                    { name: 'Explosive', value: 'explosive' },
                ))
        .addIntegerOption( option =>
            option.setName('amount')
                .setDescription('Amount to calculate')
                .setRequired(true)
                .setMinValue(0)
            ),
    async execute(interaction) {
        const chosenItem = interaction.options.getString("item");
        const chosenAmount = interaction.options.getInteger("amount");

        //Init
        let explosive;
        let gunpowdExplosive;
        let gunpowdItem;
        let totalGunpowd;
        let pipe;
        let lowgradeExplosive;
        let lowgrade;
        let metal;
        let sulfur;
        let cloth;
        let techtrash;

        //Calculatings for amount of items/resources needed
        switch(chosenItem) {
            case 'rocket':
                explosive = chosenAmount * 10;
                gunpowdExplosive = explosive * 50;
                gunpowdItem = chosenAmount * 150;
                totalGunpowd = gunpowdExplosive + gunpowdItem;
                pipe = chosenAmount * 2;
                lowgradeExplosive = explosive * 3;
                metal = explosive * 10;
                sulfur = explosive * 10;
                //Embed for Rockets
                const rocketEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} rocket`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/9/95/Rocket_icon.png/revision/latest/top-crop/width/360/height/360?cb=20151106061039')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (explosive)', value: `${gunpowdExplosive}`, inline: true },
                        { name: 'Lowgrade (explosive)', value: `${lowgradeExplosive}`, inline: true },
                        { name: 'Sulfur (explosive)', value: `${sulfur}`, inline: true },
                        { name: 'Metal (explosive)', value: `${metal}`, inline: true },
                        { name: 'Gunpowder (item)', value: `${gunpowdItem}`, inline: true },
                        { name: 'Pipe (item)', value: `${pipe}`, inline: true },
                        { name: 'Explosive (item)', value: `${explosive}`, inline: true },
                    )
                    .addField('Total Gunpowder', `${totalGunpowd}`);
                await interaction.reply({ embeds: [rocketEmbed] });
                break;
            case 'hvRocket':
                gunpowdItem = chosenAmount * 100;
                pipe = chosenAmount * 1;
                //Embed for HVRocket
                const hvrocketEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} HV rocket`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/f/f4/High_Velocity_Rocket_icon.png/revision/latest?cb=20151106054436')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (item)', value: `${gunpowdItem}`, inline: true },
                        { name: 'Pipe (item)', value: `${pipe}`, inline: true },
                    );
                await interaction.reply({ embeds: [hvrocketEmbed] });
                break;
            case 'incenRocket':
                gunpowdExplosive = chosenAmount * 50;
                lowgradeExplosive = chosenAmount * 3;
                metal = chosenAmount * 10;
                sulfur = chosenAmount * 10;
                lowgrade = chosenAmount * 250;
                pipe = chosenAmount * 2;
                //Embed for incendiary Rocket
                const incenRocketEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} Incendiary rocket`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/f/f9/Incendiary_Rocket_icon.png/revision/latest/top-crop/width/360/height/360?cb=20151106061939')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (explosive)', value: `${gunpowdExplosive}`, inline: true },
                        { name: 'Lowgrade (explosive)', value: `${lowgradeExplosive}`, inline: true },
                        { name: 'Sulfur (explosive)', value: `${sulfur}`, inline: true },
                        { name: 'Metal (explosive)', value: `${metal}`, inline: true },
                        { name: 'Lowgrade (item)', value: `${lowgrade}`, inline: true },
                        { name: 'Pipe (item)', value: `${pipe}`, inline: true },
                    );
                await interaction.reply({ embeds: [incenRocketEmbed] });
                break;
            case 'c4':
                cloth = 5 * chosenAmount;
                explosive = 20 * chosenAmount;
                techtrash = 2 * chosenAmount;
                gunpowdExplosive = explosive * 50;
                lowgradeExplosive = explosive * 3;
                metal = explosive * 10;
                sulfur = explosive * 10;
                //Embed for C4
                const c4Embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} C4`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/6/6c/Timed_Explosive_Charge_icon.png/revision/latest/top-crop/width/360/height/360?cb=20151106061610')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (explosive)', value: `${gunpowdExplosive}`, inline: true },
                        { name: 'Lowgrade (explosive)', value: `${lowgradeExplosive}`, inline: true },
                        { name: 'Sulfur (explosive)', value: `${sulfur}`, inline: true },
                        { name: 'Metal (explosive)', value: `${metal}`, inline: true },
                        { name: 'Cloth (item)', value: `${cloth}`, inline: true },
                        { name: 'Techtrash (item)', value: `${techtrash}`, inline: true },
                        { name: 'Explosive (item)', value: `${explosive}`, inline: true },
                    );
                return await interaction.reply({ embeds: [c4Embed] });
            case 'satchel':
                gunpowdItem = chosenAmount * 240;
                metal = chosenAmount * 80;
                //Embed for satchel
                const satchelEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} satchel charge`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/5/53/Small_Stash_icon.png/revision/latest?cb=20151106062004')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (item)', value: `${gunpowdItem}`, inline: true },
                        { name: 'Metal (item)', value: `${metal}`, inline: true }, 
                    );
                return await interaction.reply({ embeds: [satchelEmbed] });
            case 'exploAmmo':
                metal = (chosenAmount / 2) * 10;
                sulfur = (chosenAmount / 2) * 10;
                gunpowdItem = (chosenAmount / 2) * 20;
                //Embed for Explosive Ammo
                const exploAmmoEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} explosive ammo`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/3/31/Explosive_5.56_Rifle_Ammo_icon.png/revision/latest/top-crop/width/360/height/360?cb=20151106061449')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Metal (item)', value: `${metal}`, inline: true },
                        { name: 'Sulfur (item)', value: `${sulfur}`, inline: true },
                        { name: 'Gunpowder (item)', value: `${gunpowdItem}`, inline: true }, 
                    );
                return await interaction.reply({ embeds:[exploAmmoEmbed] });
            case 'explosive':
                gunpowdExplosive = chosenAmount * 50;
                lowgradeExplosive = chosenAmount * 3;
                sulfur = chosenAmount * 10;
                metal = chosenAmount * 10;
                //Embed for Explosive
                const explosiveEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle(`Amount of materials needed for ${chosenAmount} explosive`)
                    .setThumbnail('https://static.wikia.nocookie.net/play-rust/images/4/47/Explosives_icon.png/revision/latest/top-crop/width/360/height/360?cb=20151106054330')
                    .setDescription('All calculations are made with the mixing table')
                    .addFields(
                        { name: 'Gunpowder (item)', value: `${gunpowdExplosive}`, inline: true },
                        { name: 'Lowgrade (item)', value: `${lowgradeExplosive}`, inline: true },
                        { name: 'Sulfur (item)', value: `${sulfur}`, inline: true },
                        { name: 'Metal (item)', value: `${metal}`, inline: true }, 
                    );
                return await interaction.reply({ embeds:[explosiveEmbed] });
        }
    }
}