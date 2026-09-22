import { Events, Interaction } from "discord.js";
import { NexusClient } from "../index";

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction, client: NexusClient) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const args: string[] = [];
    interaction.options.data.forEach((o) => { if (o.value !== undefined) args.push(String(o.value)); });

    const fakeMessage: any = {
      author: interaction.user,
      member: interaction.member,
      guild: interaction.guild,
      channel: interaction.channel,
      client,
      reply: (c: any) => interaction.reply(c),
      editReply: (c: any) => interaction.editReply(c),
      deferReply: () => interaction.deferReply(),
      followUp: (c: any) => interaction.followUp(c),
      options: interaction.options,
      createdAt: interaction.createdTimestamp,
      content: args.join(" "),
      args,
      isSlash: true,
    };

    try {
      await command.execute(fakeMessage, args, client);
    } catch (error) {
      console.error(`Error in /${command.name}:`, error);
      const reply = { content: "An error occurred.", ephemeral: true };
      if (interaction.replied || interaction.deferred) await interaction.followUp(reply);
      else await interaction.reply(reply);
    }
  },
};
