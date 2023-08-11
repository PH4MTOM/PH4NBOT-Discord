exports.isUserInAVoiceChat = async (interaction) => {
    if (!interaction.member.voice.channel) {
        await interaction.reply({ content: 'You are not a voice channel!', ephemeral: true });
        return true;
    }
    return false;
}

exports.isUserInTheSameVoiceChatAsBot = async (interaction, queue) => {
    if (!queue.dispatcher) {
        return true;
    }

    if (interaction.member.voice.channel.id !== queue.dispatcher.channel.id) {
        await interaction.reply({ content: 'You are not in the same voice channel as the bot!', ephemeral: true});
        return true;
    }
    return false;
}

