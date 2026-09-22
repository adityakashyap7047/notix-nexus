import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { ReactionRole } from '../../models';

export default {
  name: 'reactionrole',
  description: 'Manage reaction role messages',
  category: 'social',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Create', value: 'create' },
        { name: 'List', value: 'list' },
        { name: 'Delete', value: 'delete' },
      ],
    },
    {
      name: 'channel',
      description: 'Channel to send reaction role message (create only)',
      type: 7,
      required: false,
    },
    {
      name: 'title',
      description: 'Title for the reaction role message (create only)',
      type: 3,
      required: false,
    },
    {
      name: 'description',
      description: 'Description for the reaction role message (create only)',
      type: 3,
      required: false,
    },
    {
      name: 'type',
      description: 'Type of reaction role (create only)',
      type: 3,
      required: false,
      choices: [
        { name: 'Reaction', value: 'reaction' },
        { name: 'Button', value: 'button' },
      ],
    },
    {
      name: 'emoji-role-pairs',
      description: 'Emoji:Role pairs, comma separated (create only). Example: 🔴:@Red, 🔵:@Blue',
      type: 3,
      required: false,
    },
    {
      name: 'message-id',
      description: 'Message ID to delete (delete only)',
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
      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
        return interaction.reply({ content: 'You need ManageRoles permission to create reaction roles.', ephemeral: true });
      }

      const channel = interaction.options?.getChannel?.('channel');
      const title = interaction.options?.getString?.('title') || 'Reaction Roles';
      const description = interaction.options?.getString?.('description') || 'Click a button or react to get a role!';
      const rrType = interaction.options?.getString?.('type') || 'button';
      const pairsStr = interaction.options?.getString?.('emoji-role-pairs');

      if (!channel) {
        return interaction.reply({ content: 'Please provide a channel.', ephemeral: true });
      }

      if (!pairsStr) {
        return interaction.reply({ content: 'Please provide emoji:role pairs. Example: 🔴:@Red, 🔵:@Blue', ephemeral: true });
      }

      const botPerms = channel.permissionsFor(interaction.guild.members.me);
      if (!botPerms?.has(PermissionFlagsBits.SendMessages) || !botPerms?.has(PermissionFlagsBits.EmbedLinks)) {
        return interaction.reply({ content: 'I need SendMessages and EmbedLinks permissions in that channel.', ephemeral: true });
      }

      const pairs = pairsStr.split(',').map((p: string) => {
        const parts = p.trim().split(':');
        return { emoji: parts[0]?.trim(), roleStr: parts[1]?.trim() };
      }).filter((p: any) => p.emoji && p.roleStr);

      if (pairs.length === 0) {
        return interaction.reply({ content: 'No valid emoji:role pairs found. Use format: 🔴:@Red, 🔵:@Blue', ephemeral: true });
      }

      const resolvedPairs: { emoji: string; role: any; roleId: string }[] = [];

      for (const pair of pairs) {
        const role = interaction.guild.roles.cache.find((r: any) =>
          r.name === pair.roleStr?.replace(/@/g, '') || r.id === pair.roleStr?.replace(/<@&/g, '').replace(/>/g, '')
        );
        if (!role) {
          return interaction.reply({ content: `Role not found: ${pair.roleStr}`, ephemeral: true });
        }
        if (role.position >= interaction.guild.members.me.roles.highest.position) {
          return interaction.reply({ content: `I cannot assign role ${role.name} - it is higher than or equal to my highest role.`, ephemeral: true });
        }
        resolvedPairs.push({ emoji: pair.emoji, role, roleId: role.id });
      }

      const embed = new EmbedBuilder()
        .setColor(COLORS.purple)
        .setTitle(title)
        .setDescription(description)
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      let msg;

      if (rrType === 'button') {
        const rows: ActionRowBuilder<ButtonBuilder>[] = [];
        let currentRow = new ActionRowBuilder<ButtonBuilder>();

        for (const pair of resolvedPairs) {
          if (currentRow.components.length === 5) {
            rows.push(currentRow);
            currentRow = new ActionRowBuilder<ButtonBuilder>();
          }
          currentRow.addComponents(
            new ButtonBuilder()
              .setCustomId(`rr_${pair.emoji}_${pair.roleId}`)
              .setLabel(pair.role.name)
              .setStyle(ButtonStyle.Primary)
              .setEmoji(pair.emoji)
          );
        }
        rows.push(currentRow);

        msg = await channel.send({ embeds: [embed], components: rows });
      } else {
        msg = await channel.send({ embeds: [embed] });
        for (const pair of resolvedPairs) {
          try {
            await msg.react(pair.emoji);
          } catch {
            return interaction.reply({ content: `Failed to add reaction ${pair.emoji}. Make sure it is a valid emoji.`, ephemeral: true });
          }
        }
      }

      for (const pair of resolvedPairs) {
        await ReactionRole.findOneAndUpdate(
          { guildId, messageId: msg.id, emoji: pair.emoji },
          { guildId, channelId: channel.id, messageId: msg.id, emoji: pair.emoji, roleId: pair.roleId, type: rrType as any },
          { upsert: true, new: true }
        );
      }

      const embed2 = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Reaction Role Created')
        .addFields(
          { name: 'Channel', value: `<#${channel.id}>`, inline: true },
          { name: 'Type', value: rrType, inline: true },
          { name: 'Roles', value: resolvedPairs.map(p => `${p.emoji} → <@&${p.roleId}>`).join('\n'), inline: false },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed2] });
    }

    if (action === 'list') {
      const roles = await ReactionRole.find({ guildId });
      if (roles.length === 0) {
        return interaction.reply({ content: 'No reaction roles configured for this server.', ephemeral: true });
      }

      const grouped = new Map<string, typeof roles>();
      for (const rr of roles) {
        const key = rr.messageId;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key)!.push(rr);
      }

      const fields = Array.from(grouped.entries()).map(([msgId, rrs]) => ({
        name: `Message ${msgId}`,
        value: rrs.map(r => `${r.emoji} → <@&${r.roleId}> (${r.type})`).join('\n'),
        inline: false,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle('📋 Reaction Roles')
        .addFields(fields.slice(0, 25))
        .setFooter({ text: `NOTIX NEXUS | ${roles.length} total`, iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'delete') {
      const messageId = interaction.options?.getString?.('message-id');
      if (!messageId) {
        return interaction.reply({ content: 'Please provide the message ID to delete reaction roles.', ephemeral: true });
      }

      const deleted = await ReactionRole.deleteMany({ guildId, messageId });
      if (deleted.deletedCount === 0) {
        return interaction.reply({ content: 'No reaction roles found for that message ID.', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('🗑️ Reaction Role Deleted')
        .setDescription(`Removed ${deleted.deletedCount} reaction role(s) for message \`${messageId}\`.`)
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
