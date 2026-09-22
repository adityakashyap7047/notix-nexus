import { NexusClient } from "../../index";
import { Warning } from "../../models";
export default {
  name: "warnings", description: "View warnings", category: "moderation", aliases: ["infractions"],
  options: [{ name: "user", description: "Target user", type: 6, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    if (!user) return message.reply("Usage: !warnings @user");
    const warnings = await Warning.find({ guildId: message.guild.id, userId: user.id, active: true }).sort({ createdAt: -1 });
    if (warnings.length === 0) return message.reply(`${user.tag} has no warnings.`);
    const list = warnings.map((w, i) => `**${i + 1}.** ${w.reason} (<@${w.moderatorId}>)`).join("\n");
    await message.reply({ embeds: [{ title: `⚠️ ${user.tag} - ${warnings.length} warnings`, description: list.slice(0, 2048), color: 0xff3b5c }] });
  },
};
