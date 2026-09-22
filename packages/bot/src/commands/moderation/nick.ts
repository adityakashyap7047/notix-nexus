import { NexusClient } from "../../index";
export default {
  name: "nick", description: "Change nickname", category: "moderation",
  options: [{ name: "user", description: "Target user", type: 6, required: true }, { name: "nickname", description: "New nickname", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    const nickname = message.options?.getString?.("nickname") || args.slice(1).join(" ");
    if (!user || !nickname) return message.reply("Usage: !nick @user <nickname>");
    const member = message.guild?.members?.cache?.get(user.id);
    if (!member?.manageable) return message.reply("Cannot change nickname.");
    await member.setNickname(nickname);
    await message.reply({ embeds: [{ title: "✏️ Nickname Changed", fields: [{ name: "User", value: `<@${user.id}>`, inline: true }, { name: "New", value: nickname, inline: true }], color: 0x00ff9c }] });
  },
};
