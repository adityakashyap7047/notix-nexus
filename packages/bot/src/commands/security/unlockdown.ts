import { NexusClient } from "../../index";
export default {
  name: "unlockdown", description: "Deactivate lockdown", category: "security",
  async execute(message: any, _args: string[], client: NexusClient) {
    for (const [, ch] of message.guild.channels.cache) {
      if (ch.isTextBased()) try { await ch.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null }); } catch {}
    }
    await message.reply({ embeds: [{ title: "🔓 LOCKDOWN OFF", color: 0x00ff9c }] });
  },
};
