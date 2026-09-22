import { NexusClient } from "../../index";
export default {
  name: "rep", description: "Give reputation", category: "social",
  options: [{ name: "user", description: "Target user", type: 6, required: true }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.mentions?.users?.first();
    if (!user || user.id === message.author.id) return message.reply("Usage: !rep @user (not yourself)");
    const { Profile } = require("../../models");
    const profile = await Profile.findOne({ userId: user.id }) || await Profile.create({ userId: user.id, username: user.tag });
    profile.reputation += 1;
    await profile.save();
    await message.reply({ embeds: [{ title: "⭐ Rep", description: `Gave rep to **${user.tag}**! They now have **${profile.reputation}** rep.`, color: 0xfbbf24 }] });
  },
};
