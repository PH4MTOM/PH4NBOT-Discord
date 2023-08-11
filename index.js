// Require the necessary classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits} = require('discord.js');
const { token, mariadbIP, mariadbUser, mariadbPass, mariadbName } = require('./config.json');
const mariadb = require('mariadb');

const { Player } = require('discord-player');
const { } = require('@discord-player/extractor');

// Creating new client instance (IDE says these does not exist. This is wrong.)
const client = new Client(
    {intents:
        [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates] });

// Making Player Instance
const player = new Player(client);

player.extractors.loadDefault();
// Manuel adding the needed Extractors
//player.extractors.register(YoutubeExtractor, {});
//player.extractors.register(SpotifyExtractor, {});
//player.extractors.register(SoundCloudExtractor, {});

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
        if(event.name === 'playerStart') {
            event.execute(player);
        }
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

    const playerCommands = ['play', 'skip'];

    try {
        if (playerCommands.includes(command.data.name)) {
            await command.execute(interaction, player)
        } else {
            await command.execute(interaction);
        }
    } catch (error) {
        console.error(error);
    }
});

//require('./music-player')(player);

/*
//Testing Database
const pool = mariadb.createPool({
    host: mariadbIP,
    user: mariadbUser,
    password: mariadbPass,
    database: mariadbName
})

async function main() {
    try  {
    let connection = await pool.getConnection();
    //INSERT INTO customers (name,adress) VALUES ('Coca Cola','Wall Street')
    let row = await connection.query("SELECT * FROM customers");
    console.log(row)
    } catch (err) {
        console.log(err);
    }
}

main();
*/

// Login to Discord with client token
client.login(token);