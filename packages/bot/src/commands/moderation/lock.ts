import { NexusClient } from "../../index";
export default {
  name: "lock", description: "Lock a channel", category: "moderation",
  async execute(message: any, _args: string[], client: NexusClient) {
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false });
    await message.reply({ embeds: [{ title: "🔒 Channel Locked", color: 0xff3b5c }] });
  },
};
