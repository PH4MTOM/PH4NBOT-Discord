// Require the necessary classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
//const { Player } = require('discord-player');
//const { DiscordAPIError } = require('@discordjs/rest');

// Creating new client instance (IDE says these does not exist. This is wrong.)
const client = new Client({intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Creating a new collection for events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); // Making sure its only .js files in the array.

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    //console.log(event);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Create a new collection for the commands (using subfolders)
client.commands = new Collection();

const commandFolder = fs.readdirSync('./commands');

for(const folder of commandFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

// Reads Commands and executes them
client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing the command!', ephemeral: true });
    }
});

// Login to Discord with client token
client.login(token);