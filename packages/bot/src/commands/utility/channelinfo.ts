import { NexusClient } from "../../index";
export default {
  name: "channelinfo", description: "Get channel info", category: "utility", aliases: ["ci"],
  options: [{ name: "channel", description: "Target channel", type: 7, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const ch = message.options?.getChannel?.("channel") || message.channel;
    await message.reply({ embeds: [{ title: `📋 #${ch.name}`, fields: [{ name: "ID", value: ch.id, inline: true }, { name: "Type", value: String(ch.type), inline: true }], color: 0x00f5ff }] });
  },
};
