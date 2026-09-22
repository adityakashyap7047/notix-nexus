import { NexusClient } from "../../index";
export default {
  name: "work", description: "Work for coins", category: "economy",
  async execute(message: any, _args: string[], client: NexusClient) {
    const { Economy } = require("../../models");
    const account = await Economy.findOne({ guildId: message.guild.id, userId: message.author.id }) || await Economy.create({ guildId: message.guild.id, userId: message.author.id });
    if (account.lastWork && Date.now() - account.lastWork.getTime() < 600000) return message.reply(`Tired! Wait ${Math.floor((600000 - (Date.now() - account.lastWork.getTime())) / 60000)}m.`);
    const jobs = [{ name: "Programmer", min: 50, max: 200 }, { name: "Driver", min: 30, max: 100 }, { name: "Chef", min: 40, max: 150 }, { name: "Doctor", min: 100, max: 300 }];
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;
    account.wallet += earned;
    account.lastWork = new Date();
    await account.save();
    await message.reply({ embeds: [{ title: "💼 Work", description: `Worked as **${job.name}**, earned **${earned}**!`, color: 0x00ff9c }] });
  },
};
