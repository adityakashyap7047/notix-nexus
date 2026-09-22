import { NexusClient } from "../../index";
export default {
  name: "poll", description: "Create a poll", category: "utility",
  options: [{ name: "question", description: "Question", type: 3, required: true }, { name: "options", description: "Options (comma separated)", type: 3, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const question = message.options?.getString?.("question") || args[0];
    const optionsStr = message.options?.getString?.("options") || args.slice(1).join(" ");
    if (!question) return message.reply("Usage: !poll <question> [options]");
    const options = optionsStr ? optionsStr.split(",").map((o: string) => o.trim()).filter(Boolean) : [];
    const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    const desc = options.length > 0 ? options.map((o: string, i: number) => `${emojis[i]} ${o}`).join("\n") : "React ✅ or ❌";
    const msg = await message.reply({ embeds: [{ title: `📊 ${question}`, description: desc, color: 0x8b5cf6 }] });
    if (options.length > 0) { for (let i = 0; i < options.length; i++) await msg.react(emojis[i]); }
    else { await msg.react("✅"); await msg.react("❌"); }
  },
};
