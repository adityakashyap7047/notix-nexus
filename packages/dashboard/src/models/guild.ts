import mongoose from 'mongoose';

export interface IGuildConfig {
  _id?: mongoose.Types.ObjectId;
  guildId: string;
  name: string;
  prefix: string;
  welcomeChannel: string | null;
  welcomeMessage: string | null;
  logChannel: string | null;
  modRole: string | null;
  muteRole: string | null;
  autoMod: {
    enabled: boolean;
    antiSpam: boolean;
    antiRaid: boolean;
    wordFilter: boolean;
    linkFilter: boolean;
    maxMentions: number;
    maxMessages: number;
    cooldown: number;
    bannedWords: string[];
  };
  tickets: {
    enabled: boolean;
    categoryId: string | null;
    supportRoles: string[];
    transcriptChannel: string | null;
    maxTickets: number;
  };
  ai: {
    enabled: boolean;
    model: string;
    responseChannel: string | null;
    cooldown: number;
    maxTokens: number;
  };
  modules: Record<string, boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const guildConfigSchema = new mongoose.Schema<IGuildConfig>(
  {
    guildId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    prefix: { type: String, default: '!' },
    welcomeChannel: { type: String, default: null },
    welcomeMessage: { type: String, default: null },
    logChannel: { type: String, default: null },
    modRole: { type: String, default: null },
    muteRole: { type: String, default: null },
    autoMod: {
      enabled: { type: Boolean, default: false },
      antiSpam: { type: Boolean, default: false },
      antiRaid: { type: Boolean, default: false },
      wordFilter: { type: Boolean, default: false },
      linkFilter: { type: Boolean, default: false },
      maxMentions: { type: Number, default: 5 },
      maxMessages: { type: Number, default: 10 },
      cooldown: { type: Number, default: 5000 },
      bannedWords: { type: [String], default: [] },
    },
    tickets: {
      enabled: { type: Boolean, default: false },
      categoryId: { type: String, default: null },
      supportRoles: { type: [String], default: [] },
      transcriptChannel: { type: String, default: null },
      maxTickets: { type: Number, default: 5 },
    },
    ai: {
      enabled: { type: Boolean, default: false },
      model: { type: String, default: 'NOVA' },
      responseChannel: { type: String, default: null },
      cooldown: { type: Number, default: 30000 },
      maxTokens: { type: Number, default: 2048 },
    },
    modules: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const GuildConfig = mongoose.model<IGuildConfig>('GuildConfig', guildConfigSchema);

export interface IGuildStats {
  _id?: mongoose.Types.ObjectId;
  guildId: string;
  messagesTotal: number;
  membersTotal: number;
  voiceActive: number;
  commandsUsed: number;
  ticketsCreated: number;
  warningsIssued: number;
  dailyStats: Array<{
    date: string;
    messages: number;
    joins: number;
    leaves: number;
    commands: number;
  }>;
  updatedAt: Date;
}

const guildStatsSchema = new mongoose.Schema<IGuildStats>(
  {
    guildId: { type: String, required: true, unique: true },
    messagesTotal: { type: Number, default: 0 },
    membersTotal: { type: Number, default: 0 },
    voiceActive: { type: Number, default: 0 },
    commandsUsed: { type: Number, default: 0 },
    ticketsCreated: { type: Number, default: 0 },
    warningsIssued: { type: Number, default: 0 },
    dailyStats: [
      {
        date: String,
        messages: Number,
        joins: Number,
        leaves: Number,
        commands: Number,
      },
    ],
  },
  { timestamps: true }
);

export const GuildStats = mongoose.model<IGuildStats>('GuildStats', guildStatsSchema);

export interface IModLog {
  _id?: mongoose.Types.ObjectId;
  guildId: string;
  moderatorId: string;
  moderatorName: string;
  targetId: string;
  targetName: string;
  action: 'ban' | 'kick' | 'mute' | 'warn' | 'timeout' | 'unban' | 'unmute';
  reason: string;
  duration: number | null;
  evidence: string[];
  createdAt: Date;
}

const modLogSchema = new mongoose.Schema<IModLog>(
  {
    guildId: { type: String, required: true },
    moderatorId: { type: String, required: true },
    moderatorName: { type: String, required: true },
    targetId: { type: String, required: true },
    targetName: { type: String, required: true },
    action: {
      type: String,
      enum: ['ban', 'kick', 'mute', 'warn', 'timeout', 'unban', 'unmute'],
      required: true,
    },
    reason: { type: String, default: 'No reason provided' },
    duration: { type: Number, default: null },
    evidence: { type: [String], default: [] },
  },
  { timestamps: true }
);

modLogSchema.index({ guildId: 1, createdAt: -1 });
modLogSchema.index({ guildId: 1, targetId: 1 });

export const ModLog = mongoose.model<IModLog>('ModLog', modLogSchema);

export interface ITicket {
  _id?: mongoose.Types.ObjectId;
  guildId: string;
  channelId: string;
  creatorId: string;
  creatorName: string;
  status: 'open' | 'closed' | 'archived';
  assignedTo: string | null;
  messages: Array<{
    author: string;
    authorId: string;
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ticketSchema = new mongoose.Schema<ITicket>(
  {
    guildId: { type: String, required: true },
    channelId: { type: String, required: true, unique: true },
    creatorId: { type: String, required: true },
    creatorName: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed', 'archived'], default: 'open' },
    assignedTo: { type: String, default: null },
    messages: [
      {
        author: String,
        authorId: String,
        content: String,
        timestamp: Date,
      },
    ],
  },
  { timestamps: true }
);

ticketSchema.index({ guildId: 1, status: 1 });
ticketSchema.index({ creatorId: 1 });

export const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
