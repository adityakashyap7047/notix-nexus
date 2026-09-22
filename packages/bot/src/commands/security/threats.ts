import { NexusClient } from "../../index";
export default {
  name: "threats", description: "View potential threats", category: "security",
  async execute(message: any, _args: string[], client: NexusClient) {
    const checks = message.guild.members.cache.map((m: any) => {
      const age = Math.floor((Date.now() - m.user.createdTimestamp) / 86400000);
      return { tag: m.user.tag, age, suspicious: age < 7 || !m.user.avatar };
    }).filter((c: any) => c.suspicious);
    if (checks.length === 0) return message.reply({ embeds: [{ title: "✅ No threats", color: 0x00ff9c }] });
    const list = checks.slice(0, 10).map((c: any) => `\`${c.tag}\` - Age: ${c.age}d`).join("\n");
    await message.reply({ embeds: [{ title: `⚠️ ${checks.length} Threats`, description: list.slice(0, 2048), color: 0xff3b5c }] });
  },
};
