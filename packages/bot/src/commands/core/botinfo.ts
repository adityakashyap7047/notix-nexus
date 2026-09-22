import { NexusClient } from "../../index";
export default {
  name: "botinfo", description: "Get bot information", category: "core",
  async execute(message: any, _args: string[], client: NexusClient) {
    const uptime = Date.now() - client.startTime;
    await message.reply({ embeds: [{ title: "⚡ NOTIXNEX", fields: [{ name: "Version", value: "2.0.0", inline: true }, { name: "Servers", value: String(client.guilds.cache.size), inline: true }, { name: "Commands", value: String(client.commands.size), inline: true }, { name: "Memory", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB`, inline: true }, { name: "Uptime", value: `${Math.floor(uptime / 86400000)}d ${Math.floor((uptime % 86400000) / 3600000)}h`, inline: true }], color: 0x00f5ff }] });
  },
};
