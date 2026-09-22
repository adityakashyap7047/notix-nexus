import { NexusClient } from "../../index";
export default {
  name: "userinfo", description: "Get user information", category: "core", aliases: ["ui"],
  options: [{ name: "user", description: "Target user", type: 6, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first() || message.author;
    const member = message.guild?.members?.cache?.get(user.id);
    const fields: any[] = [{ name: "Username", value: user.tag, inline: true }, { name: "ID", value: user.id, inline: true }, { name: "Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true }];
    if (member) fields.push({ name: "Joined", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true }, { name: "Roles", value: member.roles.cache.map((r: any) => `<@&${r.id}>`).join(", ").slice(0, 1024), inline: false });
    await message.reply({ embeds: [{ title: `👤 ${user.tag}`, thumbnail: { url: user.displayAvatarURL() }, fields, color: 0x00f5ff }] });
  },
};
