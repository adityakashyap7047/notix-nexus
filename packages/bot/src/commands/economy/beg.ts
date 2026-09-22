import { NexusClient } from "../../index";
export default {
  name: "beg", description: "Beg for coins", category: "economy",
  async execute(message: any, _args: string[], client: NexusClient) {
    const { Economy } = require("../../models");
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    const outcomes = [{ text: "Someone gave you coins!", amount: Math.floor(Math.random() * 50) + 10 }, { text: "Nobody cared.", amount: 0 }, { text: "Found coins on the ground!", amount: Math.floor(Math.random() * 20) + 5 }];
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    account.wallet += outcome.amount;
    await account.save();
    await message.reply({ embeds: [{ title: "🤲 Beg", description: outcome.text, fields: [{ name: "Earned", value: `${outcome.amount}`, inline: true }, { name: "Balance", value: `${account.wallet}`, inline: true }], color: outcome.amount > 0 ? 0x00ff9c : 0xff3b5c }] });
  },
};
