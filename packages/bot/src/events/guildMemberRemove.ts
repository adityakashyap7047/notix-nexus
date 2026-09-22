import { Events, GuildMember, TextChannel } from "discord.js";
import { NexusClient } from "../index";

export default {
  name: Events.GuildMemberRemove,
  async execute(member: GuildMember, client: NexusClient) {
    const settings = await client.getGuildSettings(member.guild.id);
    if (settings.goodbye?.enabled && settings.goodbyeChannel) {
      const channel = member.guild.channels.cache.get(settings.goodbyeChannel) as TextChannel;
      if (channel) {
        const msg = settings.goodbye.message
          .replace(/{user}/g, member.user.tag)
          .replace(/{server}/g, member.guild.name)
          .replace(/{membercount}/g, String(member.guild.memberCount));
        await channel.send(msg).catch(() => {});
      }
    }
  },
};
