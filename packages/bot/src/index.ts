import { Client, Collection } from "discord.js";
import mongoose from "mongoose";
import winston from "winston";
import { GuildSettings, IGuildSettings } from "./models";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
});

export { logger };

export interface NexusClient extends Client {
  commands: Collection<string, Command>;
  aliases: Collection<string, string>;
  cooldowns: Collection<string, Collection<string, number>>;
  config: NexusConfig;
  startTime: number;
  getGuildSettings: (guildId: string) => Promise<IGuildSettings>;
}

export interface NexusConfig {
  token: string;
  clientId: string;
  guildId: string;
  mongodbUri: string;
  prefix: string;
  logChannelId: string;
  securityChannelId: string;
  botOwnerId: string;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  category: string;
  options?: any[];
  execute: (message: any, args: string[], client: NexusClient) => Promise<void>;
  cooldown?: number;
  devOnly?: boolean;
}

export interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

const guildSettingsCache: Map<string, IGuildSettings> = new Map();

async function connectMongo(uri: string): Promise<boolean> {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    logger.info("MongoDB connected");
    return true;
  } catch (e) {
    logger.warn("MongoDB unavailable, running in memory mode");
    return false;
  }
}

function getDefaultSettings(guildId: string): IGuildSettings {
  return {
    guildId,
    prefix: "!",
    modules: { core: true, moderation: true, security: true, economy: false, leveling: true, fun: true, social: true, tickets: false },
    autoMod: { antiSpam: true, antiLink: true, antiInvite: true, antiScam: true, badWords: [], scamAction: "delete" },
    welcome: { enabled: false, message: "Welcome {user}!", embed: true },
    goodbye: { enabled: false, message: "Goodbye {user}!", embed: true },
    leveling: { enabled: true, xpMin: 15, xpMax: 25, cooldown: 60 },
    economy: { enabled: true, currency: "Coins", dailyAmount: 100 },
    customCommands: [],
  } as any;
}

export async function createBot(): Promise<NexusClient> {
  const client = new Client({ intents: [32767] }) as NexusClient;

  client.commands = new Collection();
  client.aliases = new Collection();
  client.cooldowns = new Collection();
  client.startTime = Date.now();

  const config: NexusConfig = {
    token: process.env.TOKEN || "",
    clientId: process.env.CLIENT_ID || "",
    guildId: process.env.GUILD_ID || "",
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/notixnex",
    prefix: process.env.PREFIX || "!",
    logChannelId: process.env.LOG_CHANNEL_ID || "",
    securityChannelId: process.env.SECURITY_CHANNEL_ID || "",
    botOwnerId: process.env.BOT_OWNER_ID || "",
  };
  client.config = config;

  const useMongo = await connectMongo(config.mongodbUri);

  client.getGuildSettings = async (guildId: string): Promise<IGuildSettings> => {
    if (useMongo) {
      let settings = await GuildSettings.findOne({ guildId });
      if (!settings) settings = await GuildSettings.create({ guildId });
      return settings;
    }
    if (!guildSettingsCache.has(guildId)) guildSettingsCache.set(guildId, getDefaultSettings(guildId));
    return guildSettingsCache.get(guildId)!;
  };

  const { CommandHandler } = await import("./handlers/CommandHandler");
  const { EventHandler } = await import("./handlers/EventHandler");

  const ch = new CommandHandler(client);
  await ch.loadCommands();

  const eh = new EventHandler(client);
  await eh.loadEvents();

  return client;
}
