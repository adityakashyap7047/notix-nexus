import { NexusClient } from "../../index";
export default {
  name: "snipe", description: "Snipe deleted message", category: "advanced",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.reply({ embeds: [{ title: "🔍 Snipe", description: "Deleted message tracking active.", color: 0x00f5ff }] });
  },
};
