import { EmbedBuilder } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Profile } from '../../models';

const REP_COOLDOWN = 86400000;

export default {
  name: 'rep',
  description: 'Give +1 reputation to a user (24h cooldown)',
  category: 'info',
  options: [
    {
      name: 'user',
      description: 'User to give reputation to',
      type: 6,
      required: true,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const targetUser = interaction.options?.getUser?.('user');
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    if (!targetUser) {
      return interaction.reply({ content: 'Please specify a user to give reputation to.', ephemeral: true });
    }

    if (targetUser.id === interaction.user.id) {
      return interaction.reply({ content: 'You cannot give reputation to yourself!', ephemeral: true });
    }

    if (targetUser.bot) {
      return interaction.reply({ content: 'You cannot give reputation to bots!', ephemeral: true });
    }

    const giverKey = `repCooldown_${interaction.user.id}`;
    const lastRep = (client as any)[giverKey];
    const now = Date.now();

    if (lastRep && now - lastRep < REP_COOLDOWN) {
      const remaining = REP_COOLDOWN - (now - lastRep);
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      return interaction.reply({
        content: `⏳ You need to wait **${hours}h ${minutes}m** before giving reputation again.`,
        ephemeral: true,
      });
    }

    let targetProfile = await Profile.findOne({ userId: targetUser.id });
    if (!targetProfile) {
      targetProfile = await Profile.create({
        userId: targetUser.id,
        username: targetUser.tag,
        reputation: 0,
        badges: [],
      });
    }

    targetProfile.reputation += 1;
    await targetProfile.save();

    (client as any)[giverKey] = now;

    const repStars = '⭐'.repeat(Math.min(targetProfile.reputation, 10));

    const embed = new EmbedBuilder()
      .setColor(COLORS.yellow)
      .setTitle('⭐ Reputation Given')
      .setDescription(`<@${interaction.user.id}> gave +1 reputation to <@${targetUser.id}>!`)
      .addFields(
        { name: '🎯 Target', value: `<@${targetUser.id}>`, inline: true },
        { name: '⭐ New Rep', value: `${targetProfile.reputation}`, inline: true },
        { name: '🏆 Rating', value: repStars || 'No stars yet', inline: true },
      )
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
