import { EmbedBuilder } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Profile, Level, Economy } from '../../models';

export default {
  name: 'profile',
  description: 'View a user profile card',
  category: 'info',
  options: [
    {
      name: 'user',
      description: 'User to view profile for',
      type: 6,
      required: false,
    },
  ],
  async execute(interaction: any, _args: string[], client: NexusClient) {
    const targetUser = interaction.options?.getUser?.('user') || interaction.user;
    const guildId = interaction.guild?.id;

    if (!guildId) {
      return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    const [profile, level, economy] = await Promise.all([
      Profile.findOne({ userId: targetUser.id }),
      Level.findOne({ guildId, userId: targetUser.id }),
      Economy.findOne({ guildId, userId: targetUser.id }),
    ]);

    const xp = level?.xp || 0;
    const currentLevel = level?.level || 0;
    const totalXp = level?.totalXp || 0;
    const xpForNext = (currentLevel + 1) * 100;
    const xpProgress = xpForNext > 0 ? Math.round((xp / xpForNext) * 100) : 0;

    const progressBar = '█'.repeat(Math.min(Math.round(xpProgress / 10), 10)) + '░'.repeat(10 - Math.min(Math.round(xpProgress / 10), 10));

    const wallet = economy?.wallet || 0;
    const bank = economy?.bank || 0;
    const totalBalance = wallet + bank;

    const reputation = profile?.reputation || 0;
    const badges = profile?.badges || [];
    const bio = profile?.bio || 'No bio set.';

    const member = interaction.guild.members.cache.get(targetUser.id);
    const roles = member ? member.roles.cache
      .filter((r: any) => r.id !== interaction.guild.id)
      .sort((a: any, b: any) => b.position - a.position)
      .first(5)
      .map((r: any) => `<@&${r.id}>`)
      .join(', ') || 'None' : 'Unknown';

    const repStars = '⭐'.repeat(Math.min(reputation, 10));
    const badgeDisplay = badges.length > 0 ? badges.slice(0, 5).join(' ') : 'None';

    const embed = new EmbedBuilder()
      .setColor(COLORS.purple)
      .setTitle(`👤 ${targetUser.tag}'s Profile`)
      .setThumbnail(targetUser.displayAvatarURL({ dynamic: true, size: 256 }))
      .addFields(
        {
          name: '📝 Bio',
          value: bio.length > 200 ? bio.substring(0, 200) + '...' : bio,
          inline: false,
        },
        {
          name: '📊 Level & XP',
          value: [
            `**Level:** ${currentLevel}`,
            `**XP:** ${xp} / ${xpForNext}`,
            `\`${progressBar}\` ${xpProgress}%`,
            `**Total XP:** ${totalXp.toLocaleString()}`,
          ].join('\n'),
          inline: true,
        },
        {
          name: '💰 Economy',
          value: [
            `**Wallet:** ${wallet.toLocaleString()}`,
            `**Bank:** ${bank.toLocaleString()}`,
            `**Total:** ${totalBalance.toLocaleString()}`,
          ].join('\n'),
          inline: true,
        },
        {
          name: '⭐ Reputation',
          value: reputation > 0 ? `${repStars} (${reputation})` : 'No reputation yet',
          inline: true,
        },
        {
          name: '🏅 Badges',
          value: badgeDisplay,
          inline: true,
        },
        {
          name: `🎭 Roles (${member ? member.roles.cache.size - 1 : 0})`,
          value: roles,
          inline: false,
        },
      )
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
