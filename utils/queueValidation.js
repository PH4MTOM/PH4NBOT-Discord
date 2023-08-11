exports.isThereAQueue = async (interaction, queue) => {
    if (!queue) {
        await interaction.reply({ content: 'There is no tracks in the queue nad nothing playing! Add tracks with **\\`/play\\`**', ephemeral: true });
        return true;
    }
    return false;
}

exports.isThereCurrentTrack = async (interaction, queue) => {
    if(!queue.currentTrack) {
        await interaction.reply({ content: 'There is currently nothing playing! Add tracks with **\\`/play\\`**', ephemeral: true });
        return true;
    }
    return false;
}

exports.isQueueEmpty = async (interaction, queue) => {
    if (queue.tracks.data.length === 0) {
        await interaction.reply({ content: 'There is no tracks added to the queue! Use **\\`/play\\`** to add tracks', ephemeral: true })
        return true;
    }
    return false;
}