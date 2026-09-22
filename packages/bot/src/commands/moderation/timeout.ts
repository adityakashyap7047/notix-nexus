import { NexusClient } from "../../index";
export default {
  name: "timeout", description: "Timeout a user", category: "moderation", aliases: ["mute"],
  options: [{ name: "user", description: "Target user", type: 6, required: true }, { name: "duration", description: "Duration (e.g. 10m)", type: 3, required: true }, { name: "reason", description: "Reason", type: 3, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    const duration = message.options?.getString?.("duration") || args[1];
    const reason = message.options?.getString?.("reason") || args.slice(2).join(" ") || "No reason";
    if (!user || !duration) return message.reply("Usage: !timeout @user <duration> [reason]");
    const member = message.guild?.members?.cache?.get(user.id);
    if (!member) return message.reply("User not found.");
    const ms = require("ms");
    const timeMs = ms(duration);
    if (!timeMs || timeMs > 2419200000) return message.reply("Invalid duration (max 28 days).");
    await member.timeout(timeMs, reason);
    await message.reply({ embeds: [{ title: "🔇 Timed Out", fields: [{ name: "User", value: `<@${user.id}>`, inline: true }, { name: "Duration", value: duration, inline: true }, { name: "Reason", value: reason, inline: false }], color: 0xff3b5c }] });
  },
};
