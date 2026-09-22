import { NexusClient } from "../../index";
export default {
  name: "deposit", description: "Deposit coins", category: "economy", aliases: ["dep"],
  options: [{ name: "amount", description: "Amount", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const amountStr = message.options?.getString?.("amount") || args[0];
    if (!amountStr) return message.reply("Usage: !deposit <amount>");
    const { Economy } = require("../../models");
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    const amount = amountStr === "all" ? account.wallet : parseInt(amountStr);
    if (isNaN(amount) || amount <= 0 || account.wallet < amount) return message.reply("Invalid amount.");
    account.wallet -= amount;
    account.bank += amount;
    await account.save();
    await message.reply({ embeds: [{ title: "🏦 Deposit", description: `Deposited **${amount}**.`, fields: [{ name: "Balance", value: `W: ${account.wallet} | B: ${account.bank}`, inline: true }], color: 0x00ff9c }] });
  },
};
