const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

const commandIds = ['1138833655574319236'];

for (i = 0; i < commandIds.length; i++) {
    // for guild-based commands
    rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandIds[i]))
        .then(() => console.log('Successfully deleted guild command'))
        .catch(console.error);
}


// for global commands
//rest.delete(Routes.applicationCommand(clientId, '1002675578073260039'))
//    .then(() => console.log('Successfully deleted application command'))
//    .catch(console.error);