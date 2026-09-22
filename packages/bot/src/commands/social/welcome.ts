import { EmbedBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { GuildSettings } from '../../models';

export default {
  name: 'welcome',
  description: 'Configure welcome messages for new members',
  category: 'social',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Setup', value: 'setup' },
        { name: 'Test', value: 'test' },
        { name: 'Disable', value: 'disable' },
      ],
    },
    {
      name: 'channel',
      description: 'Welcome channel (setup only)',
      type: 7,
      required: false,
    },
    {
      name: 'message',
      description: 'Welcome message (setup only). Use {user}, {server}, {memberCount} placeholders',
      type: 3,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const action = interaction.options?.getString?.('action');
    const channel = interaction.options?.getChannel?.('channel');
    const message = interaction.options?.getString?.('message');
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    const settings = await client.getGuildSettings(guildId);

    if (action === 'setup') {
      if (!channel) {
        return interaction.reply({ content: 'Please provide a channel for welcome messages.', ephemeral: true });
      }

      if (channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The channel must be a text channel.', ephemeral: true });
      }

      const botPerms = channel.permissionsFor(interaction.guild.members.me);
      if (!botPerms?.has(PermissionFlagsBits.SendMessages) || !botPerms?.has(PermissionFlagsBits.EmbedLinks)) {
        return interaction.reply({ content: 'I need SendMessages and EmbedLinks permissions in that channel.', ephemeral: true });
      }

      const welcomeMessage = message || settings.welcome.message || 'Welcome to {server}, {user}! You are member #{memberCount}.';

      settings.welcomeChannel = channel.id;
      settings.welcome.enabled = true;
      settings.welcome.message = welcomeMessage;
      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Welcome System Configured')
        .addFields(
          { name: 'Channel', value: `<#${channel.id}>`, inline: true },
          { name: 'Status', value: 'Enabled', inline: true },
          { name: 'Message', value: welcomeMessage.length > 100 ? welcomeMessage.substring(0, 100) + '...' : welcomeMessage, inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'test') {
      if (!settings.welcomeChannel) {
        return interaction.reply({ content: 'Welcome system is not configured. Use `/welcome setup` first.', ephemeral: true });
      }

      const testChannel = interaction.guild.channels.cache.get(settings.welcomeChannel);
      if (!testChannel || testChannel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The configured welcome channel no longer exists or is not a text channel.', ephemeral: true });
      }

      const testMessage = settings.welcome.message
        .replace(/{user}/g, `<@${interaction.user.id}>`)
        .replace(/{server}/g, interaction.guild.name)
        .replace(/{memberCount}/g, String(interaction.guild.memberCount));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle(`Welcome to ${interaction.guild.name}!`)
        .setDescription(testMessage)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'NOTIX NEXUS | Test Message', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      await testChannel.send({ embeds: [embed] });

      return interaction.reply({ content: `✅ Test welcome message sent to <#${testChannel.id}>.`, ephemeral: true });
    }

    if (action === 'disable') {
      if (!settings.welcome.enabled) {
        return interaction.reply({ content: 'Welcome system is already disabled.', ephemeral: true });
      }

      settings.welcome.enabled = false;
      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('❌ Welcome System Disabled')
        .setDescription('Welcome messages have been disabled for this server.')
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
