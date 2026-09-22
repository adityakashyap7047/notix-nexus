import { NexusClient } from "../../index";
export default {
  name: "withdraw", description: "Withdraw coins", category: "economy", aliases: ["wd"],
  options: [{ name: "amount", description: "Amount", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const amountStr = message.options?.getString?.("amount") || args[0];
    if (!amountStr) return message.reply("Usage: !withdraw <amount>");
    const { Economy } = require("../../models");
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    const amount = amountStr === "all" ? account.bank : parseInt(amountStr);
    if (isNaN(amount) || amount <= 0 || account.bank < amount) return message.reply("Invalid amount.");
    account.bank -= amount;
    account.wallet += amount;
    await account.save();
    await message.reply({ embeds: [{ title: "🏦 Withdraw", description: `Withdrew **${amount}**.`, fields: [{ name: "Balance", value: `W: ${account.wallet} | B: ${account.bank}`, inline: true }], color: 0x00ff9c }] });
  },
};
