import { NexusClient } from "../../index";
export default {
  name: "uptime", description: "Check bot uptime", category: "core",
  async execute(message: any, _args: string[], client: NexusClient) {
    const u = Date.now() - client.startTime;
    const d = Math.floor(u / 86400000), h = Math.floor((u % 86400000) / 3600000), m = Math.floor((u % 3600000) / 60000), s = Math.floor((u % 60000) / 1000);
    await message.reply({ embeds: [{ title: "⏱️ Uptime", description: `\`\`\`${d}d ${h}h ${m}m ${s}s\`\`\``, color: 0x00f5ff }] });
  },
};
