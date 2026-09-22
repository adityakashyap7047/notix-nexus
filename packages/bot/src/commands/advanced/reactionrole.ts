import { NexusClient } from "../../index";
import { ReactionRole } from "../../models";
export default {
  name: "reactionrole", description: "Create reaction role", category: "advanced", aliases: ["rr"],
  options: [{ name: "channel", description: "Channel", type: 7, required: true }, { name: "message_id", description: "Message ID", type: 3, required: true }, { name: "emoji", description: "Emoji", type: 3, required: true }, { name: "role", description: "Role", type: 8, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const channel = message.options?.getChannel?.("channel");
    const msgId = message.options?.getString?.("message_id") || args[1];
    const emoji = message.options?.getString?.("emoji") || args[2];
    const role = message.options?.getRole?.("role");
    if (!channel || !msgId || !emoji || !role) return message.reply("Usage: !rr #channel <msg_id> <emoji> @role");
    await ReactionRole.create({ guildId: message.guild.id, channelId: channel.id, messageId: msgId, emoji, roleId: role.id });
    await message.reply({ embeds: [{ title: "✅ Reaction Role Created", fields: [{ name: "Channel", value: `<#${channel.id}>`, inline: true }, { name: "Emoji", value: emoji, inline: true }, { name: "Role", value: `<@&${role.id}>`, inline: true }], color: 0x00ff9c }] });
  },
};
