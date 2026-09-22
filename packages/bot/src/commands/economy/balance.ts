import { NexusClient } from "../../index";
import { Economy } from "../../models";
export default {
  name: "balance", description: "Check balance", category: "economy", aliases: ["bal"],
  options: [{ name: "user", description: "Target user", type: 6, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.author;
    const account = await Economy.findOne({ guildId: message.guild.id, userId: user.id }) || await Economy.create({ guildId: message.guild.id, userId: user.id });
    await message.reply({ embeds: [{ title: `💰 ${user.tag}`, fields: [{ name: "Wallet", value: `${account.wallet}`, inline: true }, { name: "Bank", value: `${account.bank}`, inline: true }, { name: "Total", value: `${account.wallet + account.bank}`, inline: true }], color: 0xfbbf24 }] });
  },
};
