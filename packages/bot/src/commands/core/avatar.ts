import { NexusClient } from "../../index";
export default {
  name: "avatar", description: "Get user avatar", category: "core", aliases: ["av"],
  options: [{ name: "user", description: "Target user", type: 6, required: false }],
  async execute(message: any, _args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first() || message.author;
    await message.reply({ embeds: [{ title: `🖼️ ${user.tag}`, image: { url: user.displayAvatarURL({ size: 1024 }) }, color: 0x00f5ff }] });
  },
};
