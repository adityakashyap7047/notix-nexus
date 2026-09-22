import { NexusClient } from "../../index";
export default {
  name: "rps", description: "Rock Paper Scissors", category: "fun",
  options: [{ name: "choice", description: "rock, paper, scissors", type: 3, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const choices = ["rock", "paper", "scissors"];
    const user = (message.options?.getString?.("choice") || args[0] || "").toLowerCase();
    if (!choices.includes(user)) return message.reply("Choose rock, paper, or scissors!");
    const bot = choices[Math.floor(Math.random() * 3)];
    let result: string;
    if (user === bot) result = "Tie!";
    else if ((user === "rock" && bot === "scissors") || (user === "paper" && bot === "rock") || (user === "scissors" && bot === "paper")) result = "You win!";
    else result = "I win!";
    await message.reply({ embeds: [{ title: "🎮 RPS", fields: [{ name: "You", value: user, inline: true }, { name: "Bot", value: bot, inline: true }, { name: "Result", value: result }], color: result === "You win!" ? 0x00ff9c : 0xff3b5c }] });
  },
};
