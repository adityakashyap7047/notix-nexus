import { NexusClient } from "../../index";
export default {
  name: "calculator", description: "Calculate expression", category: "utility", aliases: ["calc"],
  options: [{ name: "expression", description: "Expression", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const expr = message.options?.getString?.("expression") || args.join(" ");
    if (!expr) return message.reply("Usage: !calc <expression>");
    try { const r = Function(`"use strict"; return (${expr.replace(/[^0-9+\-*/.() ]/g, "")})`)(); await message.reply({ embeds: [{ title: "🧮 Calculator", fields: [{ name: "Expression", value: `\`${expr}\``, inline: true }, { name: "Result", value: `\`${r}\``, inline: true }], color: 0x00f5ff }] }); }
    catch { await message.reply("Invalid expression."); }
  },
};
