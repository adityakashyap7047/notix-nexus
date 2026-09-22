import { NexusClient } from "../../index";
export default {
  name: "daily", description: "Claim daily", category: "economy",
  async execute(message: any, _args: string[], client: NexusClient) {
    const { Economy } = require("../../models");
    const settings = await client.getGuildSettings(message.guild.id);
    const amount = settings.economy?.dailyAmount || 100;
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    if (account.lastDaily && Date.now() - account.lastDaily.getTime() < 86400000) {
      const rem = 86400000 - (Date.now() - account.lastDaily.getTime());
      return message.reply(`Already claimed! Come back in ${Math.floor(rem / 3600000)}h ${Math.floor((rem % 3600000) / 60000)}m.`);
    }
    account.wallet += amount;
    account.lastDaily = new Date();
    await account.save();
    await message.reply({ embeds: [{ title: "💰 Daily", description: `Received **${amount}** coins!`, fields: [{ name: "Balance", value: `${account.wallet}`, inline: true }], color: 0x00ff9c }] });
  },
};
