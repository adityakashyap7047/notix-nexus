import { NexusClient } from "../../index";
export default {
  name: "lockdown", description: "Activate lockdown", category: "security",
  options: [{ name: "reason", description: "Reason", type: 3, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const reason = message.options?.getString?.("reason") || args.join(" ") || "Manual lockdown";
    for (const [, ch] of message.guild.channels.cache) {
      if (ch.isTextBased()) try { await ch.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false }); } catch {}
    }
    await message.reply({ embeds: [{ title: "🔒 LOCKDOWN", fields: [{ name: "Reason", value: reason, inline: false }], color: 0xff3b5c }] });
  },
};
