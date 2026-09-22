import { NexusClient } from "../../index";
const jokes = ["Why don't scientists trust atoms? Because they make up everything!", "Why did the scarecrow win an award? He was outstanding in his field!", "What do you call a fake noodle? An impasta!", "Why don't eggs tell jokes? They'd crack each other up!", "Why did the bicycle fall over? Because it was two-tired!"];
export default {
  name: "joke", description: "Tell a random joke", category: "fun",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.reply({ embeds: [{ title: "😂 Joke", description: jokes[Math.floor(Math.random() * jokes.length)], color: 0xfbbf24 }] });
  },
};
