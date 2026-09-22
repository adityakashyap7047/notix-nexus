import { NexusClient } from "../../index";
export default {
  name: "remindme", description: "Set reminder", category: "advanced", aliases: ["rm"],
  options: [{ name: "time", description: "Time", type: 3, required: true }, { name: "message", description: "Message", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const time = message.options?.getString?.("time") || args[0];
    const msg = message.options?.getString?.("message") || args.slice(1).join(" ");
    if (!time || !msg) return message.reply("Usage: !remindme <time> <message>");
    const ms = require("ms");
    const duration = ms(time);
    if (!duration) return message.reply("Invalid time.");
    await message.reply({ embeds: [{ title: "⏰ Reminder Set", fields: [{ name: "Time", value: time, inline: true }], color: 0x00f5ff }] });
    setTimeout(async () => { try { await message.author.send(`⏰ Reminder: ${msg}`); } catch {} }, duration);
  },
};
