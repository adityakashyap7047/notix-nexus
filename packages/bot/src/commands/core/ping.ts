import { NexusClient } from "../../index";
export default {
  name: "ping", description: "Check bot latency", category: "core",
  async execute(message: any, _args: string[], client: NexusClient) {
    const sent = await message.reply({ content: "Pinging..." });
    const latency = sent.createdTimestamp - message.createdAt;
    await sent.edit({ content: null, embeds: [{ title: "🏓 Pong!", fields: [{ name: "Latency", value: `${latency}ms`, inline: true }, { name: "API", value: `${client.ws.ping}ms`, inline: true }], color: 0x00f5ff }] });
  },
};
