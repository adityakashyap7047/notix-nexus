import { NexusClient } from "../../index";
export default {
  name: "stats", description: "View bot statistics", category: "core",
  async execute(message: any, _args: string[], client: NexusClient) {
    const uptime = Date.now() - client.startTime;
    const d = Math.floor(uptime / 86400000), h = Math.floor((uptime % 86400000) / 3600000), m = Math.floor((uptime % 3600000) / 60000);
    await message.reply({ embeds: [{ title: "📊 NOTIXNEX Statistics", fields: [{ name: "Servers", value: String(client.guilds.cache.size), inline: true }, { name: "Users", value: String(client.users.cache.size), inline: true }, { name: "Commands", value: String(client.commands.size), inline: true }, { name: "Uptime", value: `${d}d ${h}h ${m}m`, inline: true }, { name: "Ping", value: `${client.ws.ping}ms`, inline: true }, { name: "Memory", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB`, inline: true }], color: 0x00f5ff }] });
  },
};
