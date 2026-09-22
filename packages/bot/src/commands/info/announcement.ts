import { EmbedBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Announcement as AnnouncementModel } from '../../models';

export default {
  name: 'announcement',
  description: 'Create and manage announcements',
  category: 'info',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Create', value: 'create' },
        { name: 'Schedule', value: 'schedule' },
        { name: 'List', value: 'list' },
      ],
    },
    {
      name: 'channel',
      description: 'Channel to send the announcement',
      type: 7,
      required: false,
    },
    {
      name: 'title',
      description: 'Announcement title',
      type: 3,
      required: false,
    },
    {
      name: 'content',
      description: 'Announcement content',
      type: 3,
      required: false,
    },
    {
      name: 'ping-role',
      description: 'Role to ping (optional)',
      type: 8,
      required: false,
    },
    {
      name: 'schedule-time',
      description: 'Schedule time, ISO format (schedule only). Example: 2026-12-25T18:00:00',
      type: 3,
      required: false,
    },
    {
      name: 'image',
      description: 'Image URL for the announcement',
      type: 3,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const action = interaction.options?.getString?.('action');
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    if (action === 'create') {
      const channel = interaction.options?.getChannel?.('channel');
      const title = interaction.options?.getString?.('title');
      const content = interaction.options?.getString?.('content');
      const pingRole = interaction.options?.getRole?.('ping-role');
      const imageUrl = interaction.options?.getString?.('image');

      if (!channel) {
        return interaction.reply({ content: 'Please provide a channel for the announcement.', ephemeral: true });
      }

      if (channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The channel must be a text channel.', ephemeral: true });
      }

      if (!title) {
        return interaction.reply({ content: 'Please provide a title for the announcement.', ephemeral: true });
      }

      if (!content) {
        return interaction.reply({ content: 'Please provide content for the announcement.', ephemeral: true });
      }

      const botPerms = channel.permissionsFor(interaction.guild.members.me);
      if (!botPerms?.has(PermissionFlagsBits.SendMessages) || !botPerms?.has(PermissionFlagsBits.EmbedLinks)) {
        return interaction.reply({ content: 'I need SendMessages and EmbedLinks permissions in that channel.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle(`📢 ${title}`)
        .setDescription(content)
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      if (imageUrl) {
        embed.setImage(imageUrl);
      }

      const pingText = pingRole ? `<@&${pingRole.id}>` : '';

      const sent = await channel.send({
        content: pingText,
        embeds: [embed],
      });

      await AnnouncementModel.create({
        guildId,
        creatorId: interaction.user.id,
        title,
        content,
        channelId: channel.id,
        pingRole: pingRole?.id,
        sent: true,
      });

      const confirmEmbed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Announcement Sent')
        .addFields(
          { name: 'Channel', value: `<#${channel.id}>`, inline: true },
          { name: 'Title', value: title, inline: true },
          { name: 'Ping', value: pingRole ? `<@&${pingRole.id}>` : 'None', inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [confirmEmbed] });
    }

    if (action === 'schedule') {
      const channel = interaction.options?.getChannel?.('channel');
      const title = interaction.options?.getString?.('title');
      const content = interaction.options?.getString?.('content');
      const scheduleTime = interaction.options?.getString?.('schedule-time');
      const pingRole = interaction.options?.getRole?.('ping-role');

      if (!channel || !title || !content || !scheduleTime) {
        return interaction.reply({ content: 'Please provide channel, title, content, and schedule-time for scheduling.', ephemeral: true });
      }

      if (channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The channel must be a text channel.', ephemeral: true });
      }

      const scheduledDate = new Date(scheduleTime);
      if (isNaN(scheduledDate.getTime())) {
        return interaction.reply({ content: 'Invalid date format. Use ISO format: 2026-12-25T18:00:00', ephemeral: true });
      }

      if (scheduledDate.getTime() < Date.now()) {
        return interaction.reply({ content: 'The schedule time must be in the future.', ephemeral: true });
      }

      const announcement = await AnnouncementModel.create({
        guildId,
        creatorId: interaction.user.id,
        title,
        content,
        channelId: channel.id,
        scheduled: scheduledDate,
        pingRole: pingRole?.id,
        sent: false,
      });

      const embed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('⏰ Announcement Scheduled')
        .addFields(
          { name: 'Channel', value: `<#${channel.id}>`, inline: true },
          { name: 'Title', value: title, inline: true },
          { name: 'Scheduled For', value: `<t:${Math.floor(scheduledDate.getTime() / 1000)}:F>`, inline: true },
          { name: 'Ping', value: pingRole ? `<@&${pingRole.id}>` : 'None', inline: true },
          { name: '🆔 ID', value: `\`${announcement._id}\``, inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'list') {
      const announcements = await AnnouncementModel.find({ guildId }).sort({ createdAt: -1 }).limit(25);

      if (announcements.length === 0) {
        return interaction.reply({ content: 'No announcements found for this server.', ephemeral: true });
      }

      const fields = announcements.map((ann) => ({
        name: ann.title,
        value: [
          `📍 <#${ann.channelId}>`,
          ann.sent ? '✅ Sent' : `⏰ Scheduled: <t:${Math.floor(ann.scheduled!.getTime() / 1000)}:F>`,
          `By <@${ann.creatorId}>`,
          `🆔 \`${ann._id}\``,
        ].join('\n'),
        inline: false,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle('📢 Announcements')
        .addFields(fields)
        .setFooter({ text: `NOTIX NEXUS | ${announcements.length} announcement(s)`, iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
