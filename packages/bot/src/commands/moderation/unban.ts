import { NexusClient } from "../../index";
export default {
  name: "unban", description: "Unban a user", category: "moderation",
  options: [{ name: "userid", description: "User ID", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const userId = message.options?.getString?.("userid") || args[0];
    if (!userId) return message.reply("Usage: !unban <user_id>");
    try { await message.guild.members.unban(userId); await message.reply({ embeds: [{ title: "✅ Unbanned", color: 0x00ff9c }] }); }
    catch { await message.reply("Could not unban."); }
  },
};
