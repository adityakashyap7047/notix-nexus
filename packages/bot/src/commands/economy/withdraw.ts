import { EmbedBuilder, CommandInteraction } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Economy } from '../../models';

export default {
  name: 'withdraw',
  description: 'Withdraw coins from your bank to your wallet',
  category: 'economy',
  cooldown: 3,
  options: [
    { name: 'amount', description: 'Amount to withdraw (or "all")', type: 3, required: true },
  ],
  async execute(interaction: CommandInteraction, client: NexusClient) {
    const guildId = interaction.guild!.id;
    const userId = interaction.user.id;
    const amountStr = interaction.options.getString('amount', true);

    const account = await Economy.findOne({ guildId, userId });
    if (!account) {
      return interaction.reply({
        content: '❌ You don\'t have an economy account. Use `/daily` first.',
        ephemeral: true,
      });
    }

    let amount: number;
    if (amountStr.toLowerCase() === 'all') {
      amount = account.bank;
    } else {
      amount = parseInt(amountStr, 10);
    }

    if (isNaN(amount) || amount <= 0) {
      return interaction.reply({
        content: '❌ Please provide a valid positive number or use `all`.',
        ephemeral: true,
      });
    }

    if (amount > account.bank) {
      return interaction.reply({
        content: `❌ Insufficient funds. You only have **${account.bank.toLocaleString()}** coins in your bank.`,
        ephemeral: true,
      });
    }

    const updated = await Economy.findOneAndUpdate(
      { guildId, userId },
      { $inc: { wallet: amount, bank: -amount } },
      { new: true },
    );

    const embed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('🏦 Withdrawal Successful')
      .setDescription(`Withdrew **${amount.toLocaleString()}** coins from your bank.`)
      .addFields(
        { name: '💵 Wallet', value: `${updated!.wallet.toLocaleString()} coins`, inline: true },
        { name: '🏦 Bank', value: `${updated!.bank.toLocaleString()} coins`, inline: true },
        { name: '💰 Total', value: `${(updated!.wallet + updated!.bank).toLocaleString()} coins`, inline: true },
      )
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
