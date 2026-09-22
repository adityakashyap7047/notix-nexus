import { NexusClient } from "../../index";
import { Economy } from "../../models";
export default {
  name: "slots", description: "Play slots", category: "economy", aliases: ["slot"],
  async execute(message: any, _args: string[], client: NexusClient) {
    const symbols = ["🍒", "🍋", "🍊", "🍇", "💎", "7️⃣", "🔔"];
    const reels = Array(3).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    let payout = 0;
    if (reels[0] === reels[1] && reels[1] === reels[2]) payout = reels[0] === "💎" ? 500 : reels[0] === "7️⃣" ? 250 : 100;
    else if (reels[0] === reels[1] || reels[1] === reels[2]) payout = 20;
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    account.wallet += payout - (payout === 0 ? 10 : 0);
    await account.save();
    await message.reply({ embeds: [{ title: "🎰 Slots", description: `**[ ${reels.join(" | ")} ]**`, fields: [{ name: "Result", value: payout > 0 ? `Won **${payout}**!` : "Lost 10 coins.", inline: true }, { name: "Balance", value: `${account.wallet}`, inline: true }], color: payout > 0 ? 0x00ff9c : 0xff3b5c }] });
  },
};
