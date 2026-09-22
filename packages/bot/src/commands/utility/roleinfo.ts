import { NexusClient } from "../../index";
export default {
  name: "roleinfo", description: "Get role info", category: "utility",
  options: [{ name: "role", description: "Target role", type: 8, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const role = message.options?.getRole?.("role") || message.mentions?.roles?.first();
    if (!role) return message.reply("Usage: !roleinfo @role");
    await message.reply({ embeds: [{ title: `🏷️ ${role.name}`, fields: [{ name: "ID", value: role.id, inline: true }, { name: "Color", value: role.hexColor, inline: true }, { name: "Members", value: String(role.members.size), inline: true }, { name: "Position", value: String(role.position), inline: true }], color: role.color || 0x00f5ff }] });
  },
};
