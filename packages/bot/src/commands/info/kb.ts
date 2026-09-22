import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { KnowledgeBase } from '../../models';

export default {
  name: 'kb',
  description: 'Knowledge base - add, search, and list articles',
  category: 'info',
  options: [
    {
      name: 'action',
      description: 'Action to perform',
      type: 3,
      required: true,
      choices: [
        { name: 'Add', value: 'add' },
        { name: 'Search', value: 'search' },
        { name: 'List', value: 'list' },
      ],
    },
    {
      name: 'title',
      description: 'Article title (add only)',
      type: 3,
      required: false,
    },
    {
      name: 'content',
      description: 'Article content (add only)',
      type: 3,
      required: false,
    },
    {
      name: 'category',
      description: 'Article category (add only)',
      type: 3,
      required: false,
    },
    {
      name: 'tags',
      description: 'Comma-separated tags (add only)',
      type: 3,
      required: false,
    },
    {
      name: 'query',
      description: 'Search query (search only)',
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

    if (action === 'add') {
      if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.reply({ content: 'You need ManageServer permission to add knowledge base articles.', ephemeral: true });
      }

      const title = interaction.options?.getString?.('title');
      const content = interaction.options?.getString?.('content');
      const category = interaction.options?.getString?.('category') || 'general';
      const tagsStr = interaction.options?.getString?.('tags') || '';

      if (!title) {
        return interaction.reply({ content: 'Please provide a title for the article.', ephemeral: true });
      }

      if (!content) {
        return interaction.reply({ content: 'Please provide content for the article.', ephemeral: true });
      }

      const tags = tagsStr.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean);

      const existing = await KnowledgeBase.findOne({ guildId, title: { $regex: new RegExp(`^${title}$`, 'i') } });
      if (existing) {
        return interaction.reply({ content: `An article with the title **${title}** already exists. Please choose a different title.`, ephemeral: true });
      }

      const article = await KnowledgeBase.create({
        guildId,
        creatorId: interaction.user.id,
        title,
        content,
        category: category.toLowerCase(),
        tags,
      });

      const embed = new EmbedBuilder()
        .setColor(COLORS.green)
        .setTitle('✅ Article Added')
        .addFields(
          { name: '📖 Title', value: title, inline: true },
          { name: '📁 Category', value: category, inline: true },
          { name: '🏷️ Tags', value: tags.length > 0 ? tags.map((t: string) => `\`${t}\``).join(', ') : 'None', inline: false },
          { name: '🆔 ID', value: `\`${article._id}\``, inline: true },
        )
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'search') {
      const query = interaction.options?.getString?.('query');
      if (!query) {
        return interaction.reply({ content: 'Please provide a search query.', ephemeral: true });
      }

      const results = await KnowledgeBase.find({
        guildId,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } },
          { category: { $regex: query, $options: 'i' } },
        ],
      }).limit(10);

      if (results.length === 0) {
        return interaction.reply({ content: `No articles found for query **${query}**.`, ephemeral: true });
      }

      const fields = results.map((article) => ({
        name: article.title,
        value: [
          `📁 ${article.category}`,
          `🏷️ ${article.tags.length > 0 ? article.tags.map((t: string) => `\`${t}\``).join(', ') : 'No tags'}`,
          `👀 ${article.views} views`,
          `🆔 \`${article._id}\``,
        ].join('\n'),
        inline: false,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle(`🔍 Search Results for "${query}"`)
        .setDescription(`Found **${results.length}** result(s).`)
        .addFields(fields)
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    if (action === 'list') {
      const categoryFilter = interaction.options?.getString?.('category');
      const filter: any = { guildId };
      if (categoryFilter) {
        filter.category = categoryFilter.toLowerCase();
      }

      const articles = await KnowledgeBase.find(filter).sort({ views: -1 }).limit(25);

      if (articles.length === 0) {
        return interaction.reply({ content: 'No knowledge base articles found.', ephemeral: true });
      }

      const categoryGroups = new Map<string, typeof articles>();
      for (const article of articles) {
        const cat = article.category || 'general';
        if (!categoryGroups.has(cat)) categoryGroups.set(cat, []);
        categoryGroups.get(cat)!.push(article);
      }

      const fields = Array.from(categoryGroups.entries()).map(([cat, arts]) => ({
        name: `📁 ${cat.charAt(0).toUpperCase() + cat.slice(1)}`,
        value: arts.map((a) => `- **${a.title}** (👀 ${a.views}) \`${a._id}\``).join('\n'),
        inline: false,
      }));

      const embed = new EmbedBuilder()
        .setColor(COLORS.cyan)
        .setTitle('📚 Knowledge Base')
        .setDescription(`**${articles.length}** article(s) available.`)
        .addFields(fields.slice(0, 25))
        .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }
  },
};
