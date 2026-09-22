import { NexusClient } from "../../index";
export default {
  name: "unlock", description: "Unlock a channel", category: "moderation",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null });
    await message.reply({ embeds: [{ title: "🔓 Channel Unlocked", color: 0x00ff9c }] });
  },
};
