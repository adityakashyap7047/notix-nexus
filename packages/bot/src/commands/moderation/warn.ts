import { NexusClient } from "../../index";
import { Warning } from "../../models";
export default {
  name: "warn", description: "Warn a user", category: "moderation",
  options: [{ name: "user", description: "Target user", type: 6, required: true }, { name: "reason", description: "Reason", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    const reason = message.options?.getString?.("reason") || args.slice(1).join(" ");
    if (!user || !reason) return message.reply("Usage: !warn @user <reason>");
    await Warning.create({ guildId: message.guild.id, userId: user.id, moderatorId: message.author.id, reason });
    const count = await Warning.countDocuments({ guildId: message.guild.id, userId: user.id, active: true });
    await message.reply({ embeds: [{ title: "⚠️ Warned", fields: [{ name: "User", value: `<@${user.id}>`, inline: true }, { name: "Reason", value: reason, inline: false }, { name: "Total", value: String(count), inline: true }], color: 0xff3b5c }] });
  },
};
