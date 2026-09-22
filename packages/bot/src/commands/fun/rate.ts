import { NexusClient } from "../../index";
export default {
  name: "rate", description: "Rate something", category: "fun",
  options: [{ name: "thing", description: "Thing to rate", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const thing = message.options?.getString?.("thing") || args.join(" ");
    if (!thing) return message.reply("Usage: !rate <something>");
    const rating = Math.floor(Math.random() * 11);
    const bar = "█".repeat(rating) + "░".repeat(10 - rating);
    await message.reply({ embeds: [{ title: "⭐ Rate", fields: [{ name: "Thing", value: thing }, { name: "Rating", value: `${rating}/10\n\`${bar}\`` }], color: rating >= 7 ? 0x00ff9c : rating >= 4 ? 0xfbbf24 : 0xff3b5c }] });
  },
};
