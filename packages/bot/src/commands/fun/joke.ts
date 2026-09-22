import { NexusClient } from "../../index";
const jokes = ["Why don't scientists trust atoms? Because they make up everything!", "Why did the scarecrow win an award? He was outstanding in his field!", "What do you call a fake noodle? An impasta!", "I'm reading a book about anti-gravity. It's impossible to put down!", "Why did the bicycle fall over? Because it was two-tired!"];
export default {
  name: "joke", description: "Random joke", category: "fun",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.reply({ embeds: [{ title: "😂 Joke", description: jokes[Math.floor(Math.random() * jokes.length)], color: 0xfbbf24 }] });
  },
};
