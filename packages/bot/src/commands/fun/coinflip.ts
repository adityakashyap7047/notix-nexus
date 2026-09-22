import { NexusClient } from "../../index";
export default {
  name: "coinflip", description: "Flip a coin", category: "fun", aliases: ["flip"],
  async execute(message: any, _args: string[], client: NexusClient) {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    await message.reply({ embeds: [{ title: "🪙 Coin Flip", description: `**${result}!**`, color: 0xfbbf24 }] });
  },
};
