import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Event as EventModel } from '../../models';

export default {
  name: 'event',
  description: 'Manage server events with RSVP',
  category: 'info',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Create', value: 'create' },
        { name: 'Join', value: 'join' },
        { name: 'Leave', value: 'leave' },
        { name: 'List', value: 'list' },
        { name: 'End', value: 'end' },
      ],
    },
    {
      name: 'name',
      description: 'Event name (create only)',
      type: 3,
      required: false,
    },
    {
      name: 'description',
      description: 'Event description (create only)',
      type: 3,
      required: false,
    },
    {
      name: 'date',
      description: 'Event date and time, ISO format (create only). Example: 2026-12-25T18:00:00',
      type: 3,
      required: false,
    },
    {
      name: 'channel',
      description: 'Event channel (create only)',
      type: 7,
      required: false,
    },
    {
      name: 'event-id',
      description: 'Event ID for join/leave/end actions',
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
      const name = interaction.options?.getString?.('name');
      const description = interaction.options?.getString?.('description') || '';
      const dateStr = interaction.options?.getString?.('date');
      const channel = interaction.options?.getChannel?.('channel');

      if (!name) {
        return interaction.reply({ content: 'Please provide an event name.', ephemeral: true });
      }

      if (!dateStr) {
        return interaction.reply({ content: 'Please provide an event date (ISO format). Example: 2026-12-25T18:00:00', ephemeral: true });
      }

      const eventDate = new Date(dateStr);
      if (isNaN(eventDate.getTime())) {
        return interaction.reply({ content: 'Invalid date format. Use ISO format: 2026-12-25T18:00:00', ephemeral: true });
      }

      if (eventDate.getTime() < Date.now()) {
        return interaction.reply({ content: 'The event date must be in the future.', ephemeral: true });
      }

      const eventChannel = channel || interaction.channel;

      const event = await EventModel.create({
        guildId,
        creatorId: interaction.user.id,
        name,
        description,
        date: eventDate,
        channelId: eventChannel.id,
        attendees: [interaction.user.id],
      });

      const embed = new EmbedBuilder()
        .setColor(COLORS.purple)
        .setTitle(`📅 ${name}`)
        .setDescription(description || 'No description provided.')
        .addFields(
          { name: '📆 Date', value: `<t:${Math.floor(eventDate.getTime() / 1000)}:F>`, inline: true },
          { name: '📍 Channel', value: `<#${eventChannel.id}>`, inline: true },
          { name: '👤 Organizer', value: `<@${interaction.user.id}>`, inline: true },
          { name: '✅ Attending', value: `1`, inline: true },
          { name: '🆔 Event ID', value: `\`${event._id}\``, inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'join') {
      const eventId = interaction.options?.getString?.('event-id');
      if (!eventId) {
        return interaction.reply({ content: 'Please provide an event ID.', ephemeral: true });
      }

      const event = await EventModel.findOne({ guildId, _id: eventId, ended: false });
      if (!event) {
        return interaction.reply({ content: 'Event not found or already ended.', ephemeral: true });
      }

      if (event.attendees.includes(interaction.user.id)) {
        return interaction.reply({ content: 'You are already attending this event.', ephemeral: true });
      }

      event.attendees.push(interaction.user.id);
      await event.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Joined Event')
        .setDescription(`You are now attending **${event.name}**!`)
        .addFields(
          { name: '📆 Date', value: `<t:${Math.floor(event.date.getTime() / 1000)}:F>`, inline: true },
          { name: '👥 Attending', value: String(event.attendees.length), inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'leave') {
      const eventId = interaction.options?.getString?.('event-id');
      if (!eventId) {
        return interaction.reply({ content: 'Please provide an event ID.', ephemeral: true });
      }

      const event = await EventModel.findOne({ guildId, _id: eventId, ended: false });
      if (!event) {
        return interaction.reply({ content: 'Event not found or already ended.', ephemeral: true });
      }

      if (!event.attendees.includes(interaction.user.id)) {
        return interaction.reply({ content: 'You are not attending this event.', ephemeral: true });
      }

      event.attendees = event.attendees.filter((id: string) => id !== interaction.user.id);
      await event.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.orange)
        .setTitle('👋 Left Event')
        .setDescription(`You are no longer attending **${event.name}**.`)
        .addFields(
          { name: '📆 Date', value: `<t:${Math.floor(event.date.getTime() / 1000)}:F>`, inline: true },
          { name: '👥 Attending', value: String(event.attendees.length), inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'list') {
      const events = await EventModel.find({ guildId, ended: false }).sort({ date: 1 });
      if (events.length === 0) {
        return interaction.reply({ content: 'No upcoming events found.', ephemeral: true });
      }

      const fields = events.slice(0, 25).map((event) => ({
        name: event.name,
        value: `📆 <t:${Math.floor(event.date.getTime() / 1000)}:F>\n👥 ${event.attendees.length} attending\n🆔 \`${event._id}\``,
        inline: true,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle('📅 Server Events')
        .addFields(fields)
        .setFooter({ text: `NOTIX NEXUS | ${events.length} event(s)`, iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'end') {
      const eventId = interaction.options?.getString?.('event-id');
      if (!eventId) {
        return interaction.reply({ content: 'Please provide an event ID.', ephemeral: true });
      }

      const event = await EventModel.findOne({ guildId, _id: eventId, ended: false });
      if (!event) {
        return interaction.reply({ content: 'Event not found or already ended.', ephemeral: true });
      }

      if (event.creatorId !== interaction.user.id && !interaction.member.permissions.has(PermissionFlagsBits.ManageEvents)) {
        return interaction.reply({ content: 'Only the event creator or users with ManageEvents can end events.', ephemeral: true });
      }

      event.ended = true;
      await event.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('🏁 Event Ended')
        .setDescription(`**${event.name}** has been ended.`)
        .addFields(
          { name: '👥 Final Attendees', value: String(event.attendees.length), inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
