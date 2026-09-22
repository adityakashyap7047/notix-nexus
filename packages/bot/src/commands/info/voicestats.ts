import { EmbedBuilder } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { VoiceSession } from '../../models';

export default {
  name: 'voicestats',
  description: 'View voice channel activity statistics',
  category: 'info',
  options: [
    {
      name: 'user',
      description: 'User to check stats for (leave empty for server stats)',
      type: 6,
      required: false,
    },
    {
      name: 'days',
      description: 'Number of days to look back (default: 7)',
      type: 4,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const targetUser = interaction.options?.getUser?.('user') || interaction.user;
    const days = interaction.options?.getInteger?.('days') || 7;
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const sessions = await VoiceSession.find({
      guildId,
      userId: targetUser.id,
      joinTime: { $gte: startDate },
    });

    const totalDuration = sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalSessions = sessions.length;
    const avgSession = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
    const longestSession = totalSessions > 0 ? Math.max(...sessions.map(s => s.duration)) : 0;

    const currentlyInVoice = interaction.guild.members.cache.get(targetUser.id)?.voice.channel;

    const formatDuration = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      const parts: string[] = [];
      if (h > 0) parts.push(`${h}h`);
      if (m > 0) parts.push(`${m}m`);
      if (s > 0 || parts.length === 0) parts.push(`${s}s`);
      return parts.join(' ');
    };

    const channelBreakdown = new Map<string, number>();
    for (const session of sessions) {
      const current = channelBreakdown.get(session.channelId) || 0;
      channelBreakdown.set(session.channelId, current + session.duration);
    }

    const topChannels = Array.from(channelBreakdown.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([channelId, duration]) => {
        const ch = interaction.guild.channels.cache.get(channelId);
        return `${ch ? `<#${channelId}>` : channelId}: ${formatDuration(duration)}`;
      })
      .join('\n');

    const dailyBreakdown = new Map<string, number>();
    for (const session of sessions) {
      const date = session.joinTime.toISOString().split('T')[0];
      const current = dailyBreakdown.get(date) || 0;
      dailyBreakdown.set(date, current + session.duration);
    }

    const dailyChart = Array.from(dailyBreakdown.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, duration]) => {
        const bar = '█'.repeat(Math.min(Math.round((duration / Math.max(...dailyBreakdown.values())) * 10), 10));
        return `\`${date.slice(5)}\` ${bar} ${formatDuration(duration)}`;
      })
      .join('\n');

    const embed = new EmbedBuilder()
      .setColor(COLORS.cyan)
      .setTitle(`🔊 Voice Stats - ${targetUser.tag}`)
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: '📊 Summary',
          value: [
            `**Total Time:** ${formatDuration(totalDuration)}`,
            `**Total Sessions:** ${totalSessions}`,
            `**Average Session:** ${formatDuration(avgSession)}`,
            `**Longest Session:** ${formatDuration(longestSession)}`,
          ].join('\n'),
          inline: false,
        },
        {
          name: currentlyInVoice ? '🟢 Currently In Voice' : '🔴 Currently Offline',
          value: currentlyInVoice ? `**${currentlyInVoice.name}**` : 'Not in a voice channel',
          inline: true,
        },
        {
          name: '📈 Period',
          value: `Last ${days} day(s)`,
          inline: true,
        },
      );

    if (topChannels) {
      embed.addFields({ name: '📍 Top Channels', value: topChannels, inline: false });
    }

    if (dailyChart) {
      embed.addFields({ name: '📅 Daily Activity', value: dailyChart, inline: false });
    }

    embed
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
