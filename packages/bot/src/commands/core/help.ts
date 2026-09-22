import { NexusClient } from "../../index";

export default {
  name: "help",
  description: "List all available commands",
  category: "core",
  aliases: ["h"],
  options: [
    { name: "category", description: "Command category", type: 3, required: false },
  ],
  async execute(message: any, args: string[], client: NexusClient) {
    const cat = message.options?.getString?.("category") || args[0];
    const commands = client.commands;
    if (cat && commands.some((c) => c.category === cat)) {
      const list = commands.filter((c) => c.category === cat).map((c) => `\`${c.name}\` - ${c.description}`).join("\n");
      return message.reply({ embeds: [{ title: `📁 ${cat.toUpperCase()}`, description: list, color: 0x00f5ff }] });
    }
    const cats = new Map<string, string[]>();
    commands.forEach((c) => { const k = c.category; if (!cats.has(k)) cats.set(k, []); cats.get(k)!.push(c.name); });
    const fields = Array.from(cats.entries()).map(([k, v]) => ({ name: k, value: v.map((c) => `\`${c}\``).join(", "), inline: true }));
    return message.reply({ embeds: [{ title: "⚡ NOTIXNEX Commands", fields, color: 0x00f5ff }] });
  },
};
