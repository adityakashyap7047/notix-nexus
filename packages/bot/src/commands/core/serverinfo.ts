import { NexusClient } from "../../index";
export default {
  name: "serverinfo", description: "Get server information", category: "core", aliases: ["si"],
  async execute(message: any, _args: string[], client: NexusClient) {
    const g = message.guild;
    if (!g) return message.reply("Server only.");
    await message.reply({ embeds: [{ title: `📋 ${g.name}`, thumbnail: { url: g.iconURL() || "" }, fields: [{ name: "ID", value: g.id, inline: true }, { name: "Owner", value: `<@${g.ownerId}>`, inline: true }, { name: "Members", value: String(g.memberCount), inline: true }, { name: "Channels", value: String(g.channels.cache.size), inline: true }, { name: "Roles", value: String(g.roles.cache.size), inline: true }, { name: "Boosts", value: String(g.premiumSubscriptionCount || 0), inline: true }], color: 0x8b5cf6 }] });
  },
};
