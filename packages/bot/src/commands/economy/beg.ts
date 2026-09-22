import { EmbedBuilder, CommandInteraction } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Economy } from '../../models';

const NPC_REACTIONS = [
  { npc: '👨‍💼 Businessman', messages: ['Tossed you some coins from his pocket', 'Pulled out his wallet and gave you a few bills'], min: 15, max: 50, success: true },
  { npc: '👵 Kind Old Lady', messages: ['Smiled and handed you some change', 'Gave you coins from her purse'], min: 10, max: 35, success: true },
  { npc: '🧑‍🎓 College Student', messages: ['Found some spare coins in his backpack', 'Gave you what little he had'], min: 5, max: 20, success: true },
  { npc: '👩‍🦰 Tourist', messages: ['Was feeling generous and shared some change', 'Felt bad for you and gave you coins'], min: 20, max: 50, success: true },
  { npc: '👮 Police Officer', messages: ['Walked away pretending not to see you', 'Told you to get a job'], min: 0, max: 0, success: false },
  { npc: '🧛 Business Tycoon', messages: ['Laughed at you and walked away', 'Said "Get a job!" and kept walking'], min: 0, max: 0, success: false },
  { npc: '👦 Kid', messages: ['Ran away screaming', 'Looked at you confused and ran off'], min: 0, max: 0, success: false },
  { npc: '🐶 Dog', messages: ['Barked at you and ran away', 'Just stared at you blankly'], min: 0, max: 0, success: false },
  { npc: '👩‍🏫 Teacher', messages: ['Suggested volunteering instead', 'Gave you a pamphlet about job opportunities'], min: 0, max: 0, success: false },
  { npc: '🎤 Celebrity', messages: ['Was too busy for you', 'Security pushed you away'], min: 0, max: 0, success: false },
  { npc: '🧑‍🍳 Street Vendor', messages: ['Gave you a free snack and some coins', 'Shared his earnings from the day'], min: 10, max: 40, success: true },
  { npc: '🧙 Mysterious Stranger', messages: ['Tossed a bag of coins and vanished', 'Left coins on the ground and disappeared'], min: 25, max: 50, success: true },
];

export default {
  name: 'beg',
  description: 'Beg strangers for coins',
  category: 'economy',
  cooldown: 5,
  options: [],
  async execute(interaction: CommandInteraction, client: NexusClient) {
    const guildId = interaction.guild!.id;
    const userId = interaction.user.id;

    const account = await Economy.findOne({ guildId, userId });
    if (!account) {
      return interaction.reply({
        content: '❌ Please use `/daily` first to create your account.',
        ephemeral: true,
      });
    }

    const reaction = NPC_REACTIONS[Math.floor(Math.random() * NPC_REACTIONS.length)];
    const message = reaction.messages[Math.floor(Math.random() * reaction.messages.length)];
    const earned = reaction.success
      ? Math.floor(Math.random() * (reaction.max - reaction.min + 1)) + reaction.min
      : 0;

    const updated = await Economy.findOneAndUpdate(
      { guildId, userId },
      { $inc: { wallet: earned } },
      { new: true },
    );

    const embed = new EmbedBuilder()
      .setColor(earned > 0 ? COLORS.green : COLORS.red)
      .setTitle('🤲 Begging')
      .setDescription(reaction.success
        ? `**${reaction.npc}** ${message}`
        : `**${reaction.npc}** ${message}`
      )
      .addFields(
        { name: '💵 Earned', value: earned > 0 ? `+${earned} coins` : '0 coins', inline: true },
        { name: '🏦 New Balance', value: `Wallet: ${updated!.wallet.toLocaleString()}`, inline: true },
      )
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
