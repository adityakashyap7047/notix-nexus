import { NexusClient } from "../../index";
export default {
  name: "securitystatus", description: "Check security status", category: "security", aliases: ["secstatus"],
  async execute(message: any, _args: string[], client: NexusClient) {
    const settings = await client.getGuildSettings(message.guild.id);
    const am = settings.autoMod;
    const newAccounts = message.guild.members.cache.filter((m: any) => Math.floor((Date.now() - m.user.createdTimestamp) / 86400000) < 7).size;
    await message.reply({ embeds: [{ title: "🛡️ Security Status", fields: [{ name: "Anti-Spam", value: am.antiSpam ? "✅ ON" : "❌ OFF", inline: true }, { name: "Anti-Link", value: am.antiLink ? "✅ ON" : "❌ OFF", inline: true }, { name: "Anti-Invite", value: am.antiInvite ? "✅ ON" : "❌ OFF", inline: true }, { name: "Anti-Scam", value: am.antiScam ? "✅ ON" : "❌ OFF", inline: true }, { name: "New Accounts", value: String(newAccounts), inline: true }], color: 0x00f5ff }] });
  },
};
