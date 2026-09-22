import { NexusClient } from "../../index";
export default {
  name: "ban", description: "Ban a user", category: "moderation",
  options: [{ name: "user", description: "Target user", type: 6, required: true }, { name: "reason", description: "Reason", type: 3, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    const reason = message.options?.getString?.("reason") || args.slice(1).join(" ") || "No reason";
    if (!user) return message.reply("Usage: !ban @user [reason]");
    const member = message.guild?.members?.cache?.get(user.id);
    if (!member?.bannable) return message.reply("Cannot ban this user.");
    await member.ban({ reason });
    await message.reply({ embeds: [{ title: "🔨 Banned", fields: [{ name: "User", value: user.tag, inline: true }, { name: "Reason", value: reason, inline: false }], color: 0xff3b5c }] });
  },
};
