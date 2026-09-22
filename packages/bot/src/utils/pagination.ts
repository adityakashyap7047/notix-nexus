import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, Message } from 'discord.js';
import { COLORS } from '../constants';

interface PaginationOptions {
  interaction: CommandInteraction | Message;
  pages: EmbedBuilder[];
  timeout?: number;
}

export async function paginate({ interaction, pages, timeout = 60000 }: PaginationOptions): Promise<void> {
  if (pages.length === 0) return;

  let currentPage = 0;

  const getRow = (page: number, total: number) =>
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('first')
        .setEmoji('⏮')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId('prev')
        .setEmoji('◀')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId('page')
        .setLabel(`${page + 1}/${total}`)
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId('next')
        .setEmoji('▶')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === total - 1),
      new ButtonBuilder()
        .setCustomId('last')
        .setEmoji('⏭')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === total - 1)
    );

  const reply = await (interaction as CommandInteraction).reply({
    embeds: [pages[0]],
    components: [getRow(0, pages.length)],
    fetchReply: true,
  });

  const collector = reply.createMessageComponentCollector({
    time: timeout,
  });

  collector.on('collect', async (i) => {
    if (i.user.id !== (interaction as CommandInteraction).user.id) {
      return i.reply({ content: '❌ This is not for you.', ephemeral: true });
    }

    switch (i.customId) {
      case 'first':
        currentPage = 0;
        break;
      case 'prev':
        currentPage = Math.max(0, currentPage - 1);
        break;
      case 'next':
        currentPage = Math.min(pages.length - 1, currentPage + 1);
        break;
      case 'last':
        currentPage = pages.length - 1;
        break;
    }

    await i.update({
      embeds: [pages[currentPage]],
      components: [getRow(currentPage, pages.length)],
    });
  });

  collector.on('end', () => {
    reply.edit({ components: [] }).catch(() => {});
  });
}
