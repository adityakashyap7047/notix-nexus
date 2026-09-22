import { EmbedBuilder, CommandInteraction } from 'discord.js';
import { NexusClient } from '../../index';
import { COLORS } from '../../constants';
import { Economy } from '../../models';

const WORK_SCENARIOS = [
  { job: 'Programmer', messages: ['Fixed a critical bug in production', 'Deployed a new feature', 'Debugged a memory leak'], min: 50, max: 200 },
  { job: 'Chef', messages: ['Cooked a 5-star meal', 'Prepared a banquet for 50 people', 'Created a new signature dish'], min: 40, max: 150 },
  { job: 'Freelancer', messages: ['Completed a client project', 'Finished a logo design', 'Delivered a website mockup'], min: 30, max: 220 },
  { job: 'Driver', messages: ['Completed 15 deliveries', 'Drove a VIP to the airport', 'Finished a taxi shift'], min: 30, max: 120 },
  { job: 'Artist', messages: ['Sold a painting at the gallery', 'Completed a commission piece', 'Finished a mural project'], min: 20, max: 180 },
  { job: 'Teacher', messages: ['Tutored a student to an A grade', 'Led a successful workshop', 'Graded 30 assignments'], min: 35, max: 130 },
  { job: 'Mechanic', messages: ['Fixed a sports car engine', 'Rebuilt a transmission', 'Completed a full vehicle inspection'], min: 45, max: 160 },
  { job: 'Construction Worker', messages: ['Built a deck for a homeowner', 'Completed a renovation project', 'Finished framing a house'], min: 50, max: 190 },
  { job: 'Barista', messages: ['Served 100+ customers', 'Won a latte art competition', 'Created a new seasonal drink'], min: 25, max: 100 },
  { job: 'Gardener', messages: ['Landscaped a mansion garden', 'Maintained a botanical park', 'Planted a community garden'], min: 20, max: 110 },
];

export default {
  name: 'work',
  description: 'Work to earn coins',
  category: 'economy',
  cooldown: 5,
  options: [],
  async execute(interaction: CommandInteraction, client: NexusClient) {
    const guildId = interaction.guild!.id;
    const userId = interaction.user.id;
    const now = new Date();

    const account = await Economy.findOne({ guildId, userId });
    if (!account) {
      return interaction.reply({
        content: '❌ Please use `/daily` first to create your account.',
        ephemeral: true,
      });
    }

    if (account.lastWork) {
      const elapsed = now.getTime() - account.lastWork.getTime();
      const cooldownMs = 3600000;

      if (elapsed < cooldownMs) {
        const remaining = cooldownMs - elapsed;
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        return interaction.reply({
          content: `⏳ You're tired from your last shift! Work again in **${minutes}m ${seconds}s**.`,
          ephemeral: true,
        });
      }
    }

    const scenario = WORK_SCENARIOS[Math.floor(Math.random() * WORK_SCENARIOS.length)];
    const earned = Math.floor(Math.random() * (scenario.max - scenario.min + 1)) + scenario.min;
    const message = scenario.messages[Math.floor(Math.random() * scenario.messages.length)];

    const updated = await Economy.findOneAndUpdate(
      { guildId, userId },
      { $inc: { wallet: earned }, $set: { lastWork: now } },
      { new: true },
    );

    const embed = new EmbedBuilder()
      .setColor(COLORS.green)
      .setTitle('💼 Work Complete')
      .setDescription(`You worked as a **${scenario.job}** and earned **${earned}** coins!`)
      .addFields(
        { name: '📋 Task', value: message, inline: false },
        { name: '💵 Earned', value: `${earned} coins`, inline: true },
        { name: '🏦 New Balance', value: `Wallet: ${updated!.wallet.toLocaleString()} | Bank: ${updated!.bank.toLocaleString()}`, inline: true },
      )
      .setFooter({ text: 'NOTIX NEXUS', iconURL: client.user?.displayAvatarURL() || undefined })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
