import { NexusClient } from "../../index";
export default {
  name: "ship", description: "Ship two users", category: "social",
  options: [{ name: "user1", description: "First user", type: 6, required: true }, { name: "user2", description: "Second user", type: 6, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const u1 = message.options?.getUser?.("user1") || message.author;
    const u2 = message.options?.getUser?.("user2") || message.mentions?.users?.first() || message.author;
    const pct = Math.floor(Math.random() * 101);
    const bar = "█".repeat(Math.floor(pct / 10)) + "░".repeat(10 - Math.floor(pct / 10));
    await message.reply({ embeds: [{ title: "💕 Ship", description: `${u1.tag} x ${u2.tag}`, fields: [{ name: "Compatibility", value: `${pct >= 75 ? "💖" : pct >= 50 ? "💗" : "💔"} **${pct}%**\n\`${bar}\`` }], color: pct >= 50 ? 0xff69b4 : 0xff3b5c }] });
  },
};
