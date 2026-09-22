import { Events, MessageReaction, User } from "discord.js";
import { NexusClient } from "../index";
import { ReactionRole } from "../models";

export default {
  name: Events.MessageReactionAdd,
  async execute(reaction: MessageReaction, user: User, client: NexusClient) {
    if (user.bot || !reaction.message.guild) return;
    const rr = await ReactionRole.findOne({ messageId: reaction.message.id, emoji: reaction.emoji.name });
    if (rr) {
      const member = reaction.message.guild.members.cache.get(user.id);
      if (member) await member.roles.add(rr.roleId).catch(() => {});
    }
  },
};
