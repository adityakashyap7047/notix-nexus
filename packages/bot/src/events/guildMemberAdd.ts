import { Events, GuildMember, TextChannel } from "discord.js";
import { NexusClient } from "../index";

export default {
  name: Events.GuildMemberAdd,
  async execute(member: GuildMember, client: NexusClient) {
    const settings = await client.getGuildSettings(member.guild.id);

    // Auto-role
    if (settings.autoRole) {
      const role = member.guild.roles.cache.get(settings.autoRole);
      if (role) await member.roles.add(role).catch(() => {});
    }

    // Welcome
    if (settings.welcome?.enabled && settings.welcomeChannel) {
      const channel = member.guild.channels.cache.get(settings.welcomeChannel) as TextChannel;
      if (channel) {
        const msg = settings.welcome.message
          .replace(/{user}/g, `<@${member.id}>`)
          .replace(/{server}/g, member.guild.name)
          .replace(/{membercount}/g, String(member.guild.memberCount));
        await channel.send(msg).catch(() => {});
      }
    }
  },
};
