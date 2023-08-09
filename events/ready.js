module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}!`);
        client.user.setPresence({activities: [{name: `/help`, type: `PLAYING` }]});
        //if you keep coding / debugging this will be a problem.
        //client.user.setAvatar('imgs/botlogo2.jpg')
    },
};