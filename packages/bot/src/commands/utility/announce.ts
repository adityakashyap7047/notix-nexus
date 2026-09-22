import { NexusClient } from "../../index";
export default {
  name: "announce", description: "Send announcement", category: "utility", aliases: ["embed"],
  options: [{ name: "channel", description: "Target channel", type: 7, required: true }, { name: "title", description: "Title", type: 3, required: true }, { name: "message", description: "Message", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const channel = message.options?.getChannel?.("channel") || message.mentions?.channels?.first();
    const title = message.options?.getString?.("title") || args[0];
    const msg = message.options?.getString?.("message") || args.slice(1).join(" ");
    if (!channel || !title || !msg) return message.reply("Usage: !announce #channel <title> <message>");
    await channel.send({ embeds: [{ title: `📢 ${title}`, description: msg, color: 0x00f5ff, footer: { text: `By ${message.author.tag}` } }] });
    await message.reply({ embeds: [{ title: "✅ Sent!", color: 0x00ff9c }] });
  },
};
