import { NexusClient } from "../../index";
export default {
  name: "purge", description: "Delete messages", category: "moderation", aliases: ["clear"],
  options: [{ name: "amount", description: "Amount (1-100)", type: 4, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const amount = parseInt(message.options?.getInteger?.("amount") || args[0] || "0");
    if (isNaN(amount) || amount < 1 || amount > 100) return message.reply("Amount: 1-100.");
    const deleted = await message.channel.bulkDelete(amount, true);
    await message.reply({ embeds: [{ title: "🗑️ Purged", fields: [{ name: "Deleted", value: `${deleted.size} messages`, inline: true }], color: 0x00ff9c }] });
  },
};
