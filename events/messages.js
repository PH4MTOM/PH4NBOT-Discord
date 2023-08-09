module.exports = {
    name: 'messageCreate',
    execute(msg) {
        console.log(`[${msg.author.tag}]: ${msg.content}`);
    },
};