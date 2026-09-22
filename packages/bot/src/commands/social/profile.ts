import { NexusClient } from "../../index";
export default {
  name: "profile", description: "View profile", category: "social",
  options: [{ name: "user", description: "Target user", type: 6, required: false }],
  async execute(message: any, args: string[], client: NexusClient) {
    const user = message.options?.getUser?.("user") || message.author;
    const { Profile, Level, Economy } = require("../../models");
    const profile = await Profile.findOne({ userId: user.id }) || await Profile.create({ userId: user.id, username: user.tag });
    const level = await Level.findOne({ guildId: message.guild.id, userId: user.id });
    const economy = await Economy.findOne({ guildId: message.guild.id, userId: user.id });
    await message.reply({ embeds: [{ title: `👤 ${user.tag}`, thumbnail: { url: user.displayAvatarURL() }, fields: [{ name: "Bio", value: profile.bio || "None", inline: false }, { name: "Rep", value: String(profile.reputation), inline: true }, { name: "Level", value: String(level?.level || 0), inline: true }, { name: "Balance", value: `${(economy?.wallet || 0) + (economy?.bank || 0)}`, inline: true }], color: 0x8b5cf6 }] });
  },
};
