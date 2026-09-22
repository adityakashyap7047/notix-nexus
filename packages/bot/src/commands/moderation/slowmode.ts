import { NexusClient } from "../../index";
export default {
  name: "slowmode", description: "Set slowmode", category: "moderation",
  options: [{ name: "duration", description: "Duration (e.g. 5s, 1m)", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const duration = message.options?.getString?.("duration") || args[0];
    if (!duration) return message.reply("Usage: !slowmode <duration>");
    const ms = require("ms");
    const timeMs = ms(duration);
    if (timeMs === undefined) return message.reply("Invalid duration.");
    await message.channel.setRateLimitPerUser(timeMs / 1000);
    await message.reply({ embeds: [{ title: "🐌 Slowmode Set", fields: [{ name: "Duration", value: duration, inline: true }], color: 0x00ff9c }] });
  },
};
