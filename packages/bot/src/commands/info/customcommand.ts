import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { GuildSettings } from '../../models';

export default {
  name: 'customcommand',
  description: 'Create custom text commands',
  category: 'info',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Create', value: 'create' },
        { name: 'Delete', value: 'delete' },
        { name: 'List', value: 'list' },
      ],
    },
    {
      name: 'trigger',
      description: 'Command trigger word (without prefix)',
      type: 3,
      required: false,
    },
    {
      name: 'response',
      description: 'Response text',
      type: 3,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const action = interaction.options?.getString?.('action');
    const trigger = interaction.options?.getString?.('trigger')?.toLowerCase().trim();
    const response = interaction.options?.getString?.('response');
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    if (action === 'create') {
      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.reply({ content: 'You need ManageServer permission to create custom commands.', ephemeral: true });
      }

      if (!trigger) {
        return interaction.reply({ content: 'Please provide a trigger word for the custom command.', ephemeral: true });
      }

      if (!response) {
        return interaction.reply({ content: 'Please provide a response for the custom command.', ephemeral: true });
      }

      const reservedCommands = ['help', 'ping', 'stats', 'ban', 'kick', 'warn', 'mute', 'welcome', 'goodbye', 'reactionrole', 'event', 'analytics', 'voicestats', 'announcement', 'customcommand', 'profile', 'rep', 'kb'];
      if (reservedCommands.includes(trigger)) {
        return interaction.reply({ content: 'This trigger is reserved for a built-in command. Please choose a different trigger.', ephemeral: true });
      }

      const settings = await client.getGuildSettings(guildId);
      const existing = settings.customCommands.find((c) => c.trigger === trigger);

      if (existing) {
        existing.response = response;
      } else {
        settings.customCommands.push({ trigger, response });
      }

      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Custom Command Created')
        .addFields(
          { name: 'Trigger', value: `\`${settings.prefix}${trigger}\``, inline: true },
          { name: 'Response', value: response.length > 200 ? response.substring(0, 200) + '...' : response, inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'delete') {
      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.reply({ content: 'You need ManageServer permission to delete custom commands.', ephemeral: true });
      }

      if (!trigger) {
        return interaction.reply({ content: 'Please provide the trigger word of the custom command to delete.', ephemeral: true });
      }

      const settings = await client.getGuildSettings(guildId);
      const index = settings.customCommands.findIndex((c) => c.trigger === trigger);

      if (index === -1) {
        return interaction.reply({ content: `No custom command found with trigger \`${trigger}\`.`, ephemeral: true });
      }

      settings.customCommands.splice(index, 1);
      await settings.save();

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('🗑️ Custom Command Deleted')
        .setDescription(`The custom command \`${settings.prefix}${trigger}\` has been deleted.`)
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'list') {
      const settings = await client.getGuildSettings(guildId);

      if (settings.customCommands.length === 0) {
        return interaction.reply({ content: 'No custom commands configured for this server.', ephemeral: true });
      }

      const fields = settings.customCommands.slice(0, 25).map((cmd) => ({
        name: `\`${settings.prefix}${cmd.trigger}\``,
        value: cmd.response.length > 100 ? cmd.response.substring(0, 100) + '...' : cmd.response,
        inline: false,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle('📋 Custom Commands')
        .addFields(fields)
        .setFooter({ text: `NOTIX NEXUS | ${settings.customCommands.length} command(s)`, iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
