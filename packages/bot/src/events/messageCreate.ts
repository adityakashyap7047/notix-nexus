import { Events, Message, TextChannel, Collection } from "discord.js";
import { NexusClient } from "../index";

const spamTracker: Map<string, { content: string; time: number }[]> = new Map();

export default {
  name: Events.MessageCreate,
  async execute(message: Message, client: NexusClient) {
    if (message.author.bot || !message.guild) return;

    const settings = await client.getGuildSettings(message.guild.id);
    const prefix = settings.prefix || "!";
    const am = settings.autoMod;

    // Anti-spam
    if (am.antiSpam) {
      const key = `${message.guild.id}:${message.author.id}`;
      if (!spamTracker.has(key)) spamTracker.set(key, []);
      const tracker = spamTracker.get(key)!;
      tracker.push({ content: message.content, time: Date.now() });
      const recent = tracker.filter((m) => Date.now() - m.time < 5000);
      spamTracker.set(key, recent.slice(-10));
      if (recent.length >= 5) {
        try { await message.delete(); } catch {}
        return;
      }
    }

    // Anti-link
    if (am.antiLink) {
      const linkRegex = /https?:\/\/[^\s]+/gi;
      if (linkRegex.test(message.content)) {
        const scamDomains = ["dlscord", "discocrd", "steamcommunlty", "free-nitro"];
        const lower = message.content.toLowerCase();
        if (scamDomains.some((d) => lower.includes(d))) {
          try { await message.delete(); } catch {}
          return;
        }
      }
    }

    // Anti-invite
    if (am.antiInvite && /discord\.(gg|io|me|li)\/[^\s]+/gi.test(message.content)) {
      try { await message.delete(); } catch {}
      return;
    }

    // Anti-scam
    if (am.antiScam) {
      const scamPatterns = [/free\s*nitro/gi, /claim\s*(your|now|free)/gi, /crypto\s*giveaway/gi, /double\s*(your|coins)/gi];
      if (scamPatterns.some((p) => p.test(message.content))) {
        try { await message.delete(); } catch {}
        return;
      }
    }

    // Bad words
    if (am.badWords?.length > 0) {
      const lower = message.content.toLowerCase();
      if (am.badWords.some((w) => lower.includes(w.toLowerCase()))) {
        try { await message.delete(); } catch {}
        return;
      }
    }

    // Custom commands
    if (settings.customCommands?.length > 0) {
      for (const cmd of settings.customCommands) {
        if (message.content.toLowerCase() === `${prefix}${cmd.trigger.toLowerCase()}`) {
          await message.channel.send(cmd.response).catch(() => {});
          return;
        }
      }
    }

    // Prefix commands
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase() || "";
    const aliased = client.aliases.get(commandName);
    const command = client.commands.get(commandName) || (aliased ? client.commands.get(aliased) : null);
    if (!command) return;

    if (command.devOnly && message.author.id !== client.config.botOwnerId) return;

    // Cooldown
    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name)!;
    const cd = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const exp = timestamps.get(message.author.id)! + cd;
      if (now < exp) return;
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cd);

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(`Error executing ${command.name}:`, error);
    }
  },
};
