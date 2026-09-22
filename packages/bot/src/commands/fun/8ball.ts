import { NexusClient } from "../../index";
const responses = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", "Most likely.", "Outlook good.", "Yes.", "Reply hazy, try again.", "Ask again later.", "Cannot predict now.", "Don't count on it.", "My reply is no.", "Very doubtful."];
export default {
  name: "8ball", description: "Ask the magic 8-ball", category: "fun", aliases: ["eightball"],
  options: [{ name: "question", description: "Your question", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const q = message.options?.getString?.("question") || args.join(" ");
    if (!q) return message.reply("Usage: !8ball <question>");
    await message.reply({ embeds: [{ title: "🎱 Magic 8-Ball", fields: [{ name: "Question", value: q }, { name: "Answer", value: responses[Math.floor(Math.random() * responses.length)] }], color: 0x8b5cf6 }] });
  },
};
