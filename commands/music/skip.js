const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { isThereAQueue, isThereCurrentTrack, isQueueEmpty } = require('../../utils/queueValidation');
const { isUserInAVoiceChat, isUserInTheSameVoiceChatAsBot} = require('../../utils/voiceChannelValidation');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song'),

    async execute(interaction, player) {
        const channel = interaction.member.voice.channel;

        const queue = useQueue(interaction.guild.id);

        if (await isUserInAVoiceChat(interaction, queue)) {
            return;
        }
        if (await isUserInTheSameVoiceChatAsBot(interaction, queue)) {
            return;
        }
        if (await isThereAQueue(interaction, queue)) {
            return;
        }
        if (await isThereCurrentTrack(interaction, queue)) {
            return;
        }

        await interaction.deferReply();

        const skipEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`Skipped __${queue.currentTrack.title}__`)

        queue.node.skip();

        return await interaction.followUp({ embeds: [skipEmbed] })
    }
}