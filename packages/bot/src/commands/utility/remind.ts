import { NexusClient } from "../../index";
export default {
  name: "remind", description: "Set a reminder", category: "utility", aliases: ["remindme"],
  options: [{ name: "time", description: "Time (e.g. 1h, 30m)", type: 3, required: true }, { name: "message", description: "Message", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const time = message.options?.getString?.("time") || args[0];
    const msg = message.options?.getString?.("message") || args.slice(1).join(" ");
    if (!time || !msg) return message.reply("Usage: !remind <time> <message>");
    const ms = require("ms");
    const duration = ms(time);
    if (!duration) return message.reply("Invalid time.");
    await message.reply({ embeds: [{ title: "⏰ Reminder Set", fields: [{ name: "Time", value: time, inline: true }, { name: "Message", value: msg, inline: false }], color: 0x00f5ff }] });
    setTimeout(async () => { try { await message.author.send(`⏰ Reminder: ${msg}`); } catch {} }, duration);
  },
};
