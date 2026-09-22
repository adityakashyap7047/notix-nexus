import { NexusClient } from "../../index";
export default {
  name: "support", description: "Get support", category: "utility",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.reply({ embeds: [{ title: "❓ Support", description: "Use `/help` for command list.", color: 0x00f5ff }] });
  },
};
