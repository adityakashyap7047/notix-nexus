import { EmbedBuilder, CommandInteraction } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS, SHOP_ITEMS } from '../../constants';
import { paginate } from '../../utils/pagination';

const ITEMS_PER_PAGE = 4;

export default {
  name: 'shop',
  description: 'Browse the item shop',
  category: 'economy',
  cooldown: 5,
  options: [],
  async execute(interaction: CommandInteraction, client: NexusClient) {
    if (SHOP_ITEMS.length === 0) {
      return interaction.reply({
        content: '🏪 The shop is currently empty.',
        ephemeral: true,
      });
    }

    const pages: EmbedBuilder[] = [];
    const totalPages = Math.ceil(SHOP_ITEMS.length / ITEMS_PER_PAGE);

    for (let i = 0; i < totalPages; i++) {
      const start = i * ITEMS_PER_PAGE;
      const pageItems = SHOP_ITEMS.slice(start, start + ITEMS_PER_PAGE);

      const embed = new EmbedBuilder()
        .setColor(COLORS.purple)
        .setTitle('🏪 NOTIX NEXUS Shop')
        .setDescription('Use `/buy <item>` to purchase an item.')
        .setFooter({ text: `Page ${i + 1} of ${totalPages} | NOTIX NEXUS`, iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      for (const item of pageItems) {
        embed.addFields({
          name: `${item.name}`,
          value: `**Price:** ${item.price.toLocaleString()} coins\n**Type:** ${item.type}\n${item.description}`,
          inline: true,
        });
      }

      pages.push(embed);
    }

    if (pages.length === 1) {
      return interaction.reply({ embeds: [pages[0]] });
    }

    await paginate({ interaction, pages });
  },
};
