import { NexusClient } from "../../index";
export default {
  name: "invite", description: "Get bot invite link", category: "core",
  async execute(message: any, _args: string[], client: NexusClient) {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${client.config.clientId}&permissions=8&scope=bot%20applications.commands`;
    await message.reply({ embeds: [{ title: "🔗 Invite NOTIXNEX", description: `[Click here](${link})`, color: 0x00f5ff }] });
  },
};
