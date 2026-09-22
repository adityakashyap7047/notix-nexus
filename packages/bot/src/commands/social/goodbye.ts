import { EmbedBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { GuildSettings } from '../../models';

export default {
  name: 'goodbye',
  description: 'Configure goodbye messages for departing members',
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
      description: 'Goodbye channel (setup only)',
      type: 7,
      required: false,
    },
    {
      name: 'message',
      description: 'Goodbye message (setup only). Use {user}, {server}, {memberCount} placeholders',
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
        return interaction.reply({ content: 'Please provide a channel for goodbye messages.', ephemeral: true });
      }

      if (channel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The channel must be a text channel.', ephemeral: true });
      }

      const botPerms = channel.permissionsFor(interaction.guild.members.me);
      if (!botPerms?.has(PermissionFlagsBits.SendMessages) || !botPerms?.has(PermissionFlagsBits.EmbedLinks)) {
        return interaction.reply({ content: 'I need SendMessages and EmbedLinks permissions in that channel.', ephemeral: true });
      }

      const goodbyeMessage = message || settings.goodbye.message || 'Goodbye {user}! We will miss you.';

      settings.goodbyeChannel = channel.id;
      settings.goodbye.enabled = true;
      settings.goodbye.message = goodbyeMessage;
      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Goodbye System Configured')
        .addFields(
          { name: 'Channel', value: `<#${channel.id}>`, inline: true },
          { name: 'Status', value: 'Enabled', inline: true },
          { name: 'Message', value: goodbyeMessage.length > 100 ? goodbyeMessage.substring(0, 100) + '...' : goodbyeMessage, inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'test') {
      if (!settings.goodbyeChannel) {
        return interaction.reply({ content: 'Goodbye system is not configured. Use `/goodbye setup` first.', ephemeral: true });
      }

      const testChannel = interaction.guild.channels.cache.get(settings.goodbyeChannel);
      if (!testChannel || testChannel.type !== ChannelType.GuildText) {
        return interaction.reply({ content: 'The configured goodbye channel no longer exists or is not a text channel.', ephemeral: true });
      }

      const testMessage = settings.goodbye.message
        .replace(/{user}/g, `<@${interaction.user.id}>`)
        .replace(/{server}/g, interaction.guild.name)
        .replace(/{memberCount}/g, String(interaction.guild.memberCount));

      const embed = new EmbedBuilder()
        .setColor(COLORS.orange)
        .setTitle(`Goodbye from ${interaction.guild.name}!`)
        .setDescription(testMessage)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'NOTIX NEXUS | Test Message', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      await testChannel.send({ embeds: [embed] });

      return interaction.reply({ content: `✅ Test goodbye message sent to <#${testChannel.id}>.`, ephemeral: true });
    }

    if (action === 'disable') {
      if (!settings.goodbye.enabled) {
        return interaction.reply({ content: 'Goodbye system is already disabled.', ephemeral: true });
      }

      settings.goodbye.enabled = false;
      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('❌ Goodbye System Disabled')
        .setDescription('Goodbye messages have been disabled for this server.')
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
