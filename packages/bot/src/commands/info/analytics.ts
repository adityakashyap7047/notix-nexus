import { EmbedBuilder } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { ServerAnalytics, GuildSettings } from '../../models';

export default {
  name: 'analytics',
  description: 'View server analytics and statistics',
  category: 'info',
  options: [
    {
      name: 'type',
      description: 'Type of analytics to view',
      type: 3,
      required: true,
      choices: [
        { name: 'Overview', value: 'overview' },
        { name: 'Messages', value: 'messages' },
        { name: 'Members', value: 'members' },
        { name: 'Growth', value: 'growth' },
      ],
    },
    {
      name: 'days',
      description: 'Number of days to look back (default: 7)',
      type: 4,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const type = interaction.options?.getString?.('type');
    const days = interaction.options?.getInteger?.('days') || 7;
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startStr = startDate.toISOString().split('T')[0];

    const analytics = await ServerAnalytics.find({
      guildId,
      date: { $gte: startStr },
    }).sort({ date: 1 });

    if (analytics.length === 0) {
      return interaction.reply({
        content: `No analytics data found for the last ${days} day(s). Data is collected daily.`,
        ephemeral: true,
      });
    }

    const totalMessages = analytics.reduce((sum, a) => sum + a.messageCount, 0);
    const totalCommands = analytics.reduce((sum, a) => sum + a.commandsUsed, 0);
    const totalVoiceMinutes = analytics.reduce((sum, a) => sum + a.voiceMinutes, 0);
    const totalNewMembers = analytics.reduce((sum, a) => sum + a.newMembers, 0);
    const totalLeftMembers = analytics.reduce((sum, a) => sum + a.leftMembers, 0);
    const avgMemberCount = Math.round(analytics.reduce((sum, a) => sum + a.memberCount, 0) / analytics.length);
    const peakMemberCount = Math.max(...analytics.map(a => a.memberCount));
    const latestMemberCount = analytics[analytics.length - 1]?.memberCount || interaction.guild.memberCount;

    if (type === 'overview') {
      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle(`📊 Analytics Overview - ${interaction.guild.name}`)
        .setDescription(`Server statistics for the last **${days}** day(s).`)
        .addFields(
          { name: '💬 Total Messages', value: totalMessages.toLocaleString(), inline: true },
          { name: '⚡ Commands Used', value: totalCommands.toLocaleString(), inline: true },
          { name: '🔊 Voice Minutes', value: totalVoiceMinutes.toLocaleString(), inline: true },
          { name: '📥 New Members', value: totalNewMembers.toLocaleString(), inline: true },
          { name: '📤 Left Members', value: totalLeftMembers.toLocaleString(), inline: true },
          { name: '📈 Net Growth', value: `${totalNewMembers - totalLeftMembers >= 0 ? '+' : ''}${totalNewMembers - totalLeftMembers}`, inline: true },
          { name: '👥 Current Members', value: latestMemberCount.toLocaleString(), inline: true },
          { name: '📊 Avg Members', value: avgMemberCount.toLocaleString(), inline: true },
          { name: '🏔️ Peak Members', value: peakMemberCount.toLocaleString(), inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (type === 'messages') {
      const dailyAvg = Math.round(totalMessages / analytics.length);
      const maxDay = analytics.reduce((max, a) => a.messageCount > max.messageCount ? a : max, analytics[0]);
      const minDay = analytics.reduce((min, a) => a.messageCount < min.messageCount ? a : min, analytics[0]);

      const chart = analytics.map(a => {
        const bar = '█'.repeat(Math.min(Math.round((a.messageCount / Math.max(...analytics.map(x => x.messageCount))) * 10), 10));
        return `\`${a.date.slice(5)}\` ${bar} ${a.messageCount}`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setColor(COLORS.blue)
        .setTitle(`💬 Message Analytics - ${interaction.guild.name}`)
        .addFields(
          { name: '📊 Total Messages', value: totalMessages.toLocaleString(), inline: true },
          { name: '📈 Daily Average', value: dailyAvg.toLocaleString(), inline: true },
          { name: '🔝 Peak Day', value: `${maxDay.date}: ${maxDay.messageCount}`, inline: true },
          { name: '📉 Lowest Day', value: `${minDay.date}: ${minDay.messageCount}`, inline: true },
          { name: '📅 Daily Breakdown', value: chart || 'No data', inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (type === 'members') {
      const chart = analytics.map(a => {
        const bar = '█'.repeat(Math.min(Math.round((a.memberCount / Math.max(...analytics.map(x => x.memberCount))) * 10), 10));
        return `\`${a.date.slice(5)}\` ${bar} ${a.memberCount}`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle(`👥 Member Analytics - ${interaction.guild.name}`)
        .addFields(
          { name: '📥 New Members', value: totalNewMembers.toLocaleString(), inline: true },
          { name: '📤 Left Members', value: totalLeftMembers.toLocaleString(), inline: true },
          { name: '📈 Net Change', value: `${totalNewMembers - totalLeftMembers >= 0 ? '+' : ''}${totalNewMembers - totalLeftMembers}`, inline: true },
          { name: '📊 Avg Count', value: avgMemberCount.toLocaleString(), inline: true },
          { name: '🏔️ Peak', value: peakMemberCount.toLocaleString(), inline: true },
          { name: '📅 Daily Member Count', value: chart || 'No data', inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (type === 'growth') {
      const firstDay = analytics[0];
      const lastDay = analytics[analytics.length - 1];
      const memberGrowth = lastDay.memberCount - firstDay.memberCount;
      const memberGrowthPct = firstDay.memberCount > 0
        ? ((memberGrowth / firstDay.memberCount) * 100).toFixed(1)
        : '0.0';

      const growthTrend = analytics.map((a, i) => {
        if (i === 0) return `\`${a.date.slice(5)}\` ${a.memberCount}`;
        const prev = analytics[i - 1].memberCount;
        const change = a.memberCount - prev;
        const arrow = change > 0 ? '📈' : change < 0 ? '📉' : '➡️';
        return `\`${a.date.slice(5)}\` ${arrow} ${change >= 0 ? '+' : ''}${change}`;
      }).join('\n');

      const embed = new EmbedBuilder()
        .setColor(COLORS.purple)
        .setTitle(`📈 Growth Analytics - ${interaction.guild.name}`)
        .addFields(
          { name: '📊 Starting Members', value: firstDay.memberCount.toLocaleString(), inline: true },
          { name: '📊 Current Members', value: lastDay.memberCount.toLocaleString(), inline: true },
          { name: '📈 Total Growth', value: `${memberGrowth >= 0 ? '+' : ''}${memberGrowth} (${memberGrowthPct}%)`, inline: true },
          { name: '📥 Total Joined', value: totalNewMembers.toLocaleString(), inline: true },
          { name: '📤 Total Left', value: totalLeftMembers.toLocaleString(), inline: true },
          { name: '📊 Retention Rate', value: totalNewMembers > 0
            ? `${((1 - totalLeftMembers / (firstDay.memberCount + totalNewMembers)) * 100).toFixed(1)}%`
            : 'N/A', inline: true },
          { name: '📅 Daily Trend', value: growthTrend || 'No data', inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
