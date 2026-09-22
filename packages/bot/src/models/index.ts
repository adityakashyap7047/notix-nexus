import mongoose, { Schema, Document } from "mongoose";

export interface IGuildSettings extends Document {
  guildId: string;
  prefix: string;
  welcomeChannel?: string;
  goodbyeChannel?: string;
  logChannel?: string;
  autoRole?: string;
  muteRole?: string;
  levelChannel?: string;
  modules: {
    core: boolean;
    moderation: boolean;
    security: boolean;
    economy: boolean;
    leveling: boolean;
    fun: boolean;
    social: boolean;
    tickets: boolean;
  };
  autoMod: {
    antiSpam: boolean;
    antiLink: boolean;
    antiInvite: boolean;
    antiScam: boolean;
    badWords: string[];
    scamAction: string;
  };
  welcome: {
    enabled: boolean;
    message: string;
    embed: boolean;
  };
  goodbye: {
    enabled: boolean;
    message: string;
    embed: boolean;
  };
  leveling: {
    enabled: boolean;
    xpMin: number;
    xpMax: number;
    cooldown: number;
  };
  economy: {
    enabled: boolean;
    currency: string;
    dailyAmount: number;
  };
  customCommands: Array<{ trigger: string; response: string }>;
}

const GuildSettingsSchema = new Schema<IGuildSettings>({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: "!" },
  welcomeChannel: String,
  goodbyeChannel: String,
  logChannel: String,
  autoRole: String,
  muteRole: String,
  levelChannel: String,
  modules: {
    core: { type: Boolean, default: true },
    moderation: { type: Boolean, default: true },
    security: { type: Boolean, default: true },
    economy: { type: Boolean, default: false },
    leveling: { type: Boolean, default: true },
    fun: { type: Boolean, default: true },
    social: { type: Boolean, default: true },
    tickets: { type: Boolean, default: false },
  },
  autoMod: {
    antiSpam: { type: Boolean, default: true },
    antiLink: { type: Boolean, default: true },
    antiInvite: { type: Boolean, default: true },
    antiScam: { type: Boolean, default: true },
    badWords: { type: [String], default: [] },
    scamAction: { type: String, default: "delete" },
  },
  welcome: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: "Welcome to the server!" },
    embed: { type: Boolean, default: true },
  },
  goodbye: {
    enabled: { type: Boolean, default: false },
    message: { type: String, default: "Goodbye!" },
    embed: { type: Boolean, default: true },
  },
  leveling: {
    enabled: { type: Boolean, default: true },
    xpMin: { type: Number, default: 15 },
    xpMax: { type: Number, default: 25 },
    cooldown: { type: Number, default: 60 },
  },
  economy: {
    enabled: { type: Boolean, default: false },
    currency: { type: String, default: "Coins" },
    dailyAmount: { type: Number, default: 100 },
  },
  customCommands: { type: [{ trigger: String, response: String }], default: [] },
}, { timestamps: true });

export const GuildSettings = mongoose.model<IGuildSettings>("GuildSettings", GuildSettingsSchema);

export interface IWarning extends Document {
  guildId: string;
  userId: string;
  moderatorId: string;
  reason: string;
  active: boolean;
}

const WarningSchema = new Schema<IWarning>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  moderatorId: { type: String, required: true },
  reason: { type: String, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Warning = mongoose.model<IWarning>("Warning", WarningSchema);

export interface IModLog extends Document {
  guildId: string;
  userId: string;
  moderatorId: string;
  action: string;
  reason: string;
  duration?: number;
}

const ModLogSchema = new Schema<IModLog>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  moderatorId: { type: String, required: true },
  action: { type: String, required: true },
  reason: { type: String, required: true },
  duration: Number,
}, { timestamps: true });

export const ModLog = mongoose.model<IModLog>("ModLog", ModLogSchema);

export interface ILevel extends Document {
  guildId: string;
  userId: string;
  xp: number;
  level: number;
  totalXp: number;
  lastXpTime: Date;
}

const LevelSchema = new Schema<ILevel>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  totalXp: { type: Number, default: 0 },
  lastXpTime: { type: Date, default: Date.now },
}, { timestamps: true });

LevelSchema.index({ guildId: 1, userId: 1 }, { unique: true });
export const Level = mongoose.model<ILevel>("Level", LevelSchema);

export interface IEconomy extends Document {
  guildId: string;
  userId: string;
  wallet: number;
  bank: number;
  lastDaily?: Date;
  lastWork?: Date;
  dailyStreak: number;
  inventory: { name: string; quantity: number }[];
}

const EconomySchema = new Schema<IEconomy>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  lastDaily: Date,
  lastWork: Date,
  dailyStreak: { type: Number, default: 0 },
  inventory: [{ name: String, quantity: { type: Number, default: 1 } }],
}, { timestamps: true });

EconomySchema.index({ guildId: 1, userId: 1 }, { unique: true });
export const Economy = mongoose.model<IEconomy>("Economy", EconomySchema);

export interface IProfile extends Document {
  userId: string;
  username: string;
  bio?: string;
  reputation: number;
  badges: string[];
}

const ProfileSchema = new Schema<IProfile>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  bio: { type: String, default: "" },
  reputation: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
}, { timestamps: true });

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

export interface IReactionRole extends Document {
  guildId: string;
  channelId: string;
  messageId: string;
  emoji: string;
  roleId: string;
  type: "reaction" | "button";
  label?: string;
  style?: number;
}

const ReactionRoleSchema = new Schema<IReactionRole>({
  guildId: { type: String, required: true },
  channelId: { type: String, required: true },
  messageId: { type: String, required: true },
  emoji: { type: String, required: true },
  roleId: { type: String, required: true },
  type: { type: String, enum: ["reaction", "button"], default: "reaction" },
  label: { type: String },
  style: { type: Number },
});

ReactionRoleSchema.index({ messageId: 1, emoji: 1 }, { unique: true });
export const ReactionRole = mongoose.model<IReactionRole>("ReactionRole", ReactionRoleSchema);

export interface IEvent extends Document {
  guildId: string;
  creatorId: string;
  name: string;
  description: string;
  date: Date;
  channelId: string;
  messageId?: string;
  attendees: string[];
  ended: boolean;
}

const EventSchema = new Schema<IEvent>({
  guildId: { type: String, required: true },
  creatorId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: Date, required: true },
  channelId: { type: String, required: true },
  messageId: String,
  attendees: { type: [String], default: [] },
  ended: { type: Boolean, default: false },
}, { timestamps: true });

EventSchema.index({ guildId: 1, ended: 1 });
export const Event = mongoose.model<IEvent>("Event", EventSchema);

export interface IServerAnalytics extends Document {
  guildId: string;
  date: string;
  messageCount: number;
  memberCount: number;
  voiceMinutes: number;
  commandsUsed: number;
  newMembers: number;
  leftMembers: number;
}

const ServerAnalyticsSchema = new Schema<IServerAnalytics>({
  guildId: { type: String, required: true },
  date: { type: String, required: true },
  messageCount: { type: Number, default: 0 },
  memberCount: { type: Number, default: 0 },
  voiceMinutes: { type: Number, default: 0 },
  commandsUsed: { type: Number, default: 0 },
  newMembers: { type: Number, default: 0 },
  leftMembers: { type: Number, default: 0 },
}, { timestamps: true });

ServerAnalyticsSchema.index({ guildId: 1, date: 1 }, { unique: true });
export const ServerAnalytics = mongoose.model<IServerAnalytics>("ServerAnalytics", ServerAnalyticsSchema);

export interface IVoiceSession extends Document {
  guildId: string;
  userId: string;
  channelId: string;
  joinTime: Date;
  leaveTime?: Date;
  duration: number;
}

const VoiceSessionSchema = new Schema<IVoiceSession>({
  guildId: { type: String, required: true },
  userId: { type: String, required: true },
  channelId: { type: String, required: true },
  joinTime: { type: Date, default: Date.now },
  leaveTime: Date,
  duration: { type: Number, default: 0 },
}, { timestamps: true });

VoiceSessionSchema.index({ guildId: 1, userId: 1 });
export const VoiceSession = mongoose.model<IVoiceSession>("VoiceSession", VoiceSessionSchema);

export interface IAnnouncement extends Document {
  guildId: string;
  creatorId: string;
  title: string;
  content: string;
  channelId: string;
  scheduled?: Date;
  sent: boolean;
  pingRole?: string;
}

const AnnouncementSchema = new Schema<IAnnouncement>({
  guildId: { type: String, required: true },
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  channelId: { type: String, required: true },
  scheduled: Date,
  sent: { type: Boolean, default: false },
  pingRole: String,
}, { timestamps: true });

AnnouncementSchema.index({ guildId: 1, sent: 1 });
export const Announcement = mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export interface IKnowledgeBase extends Document {
  guildId: string;
  creatorId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
}

const KnowledgeBaseSchema = new Schema<IKnowledgeBase>({
  guildId: { type: String, required: true },
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: "general" },
  tags: { type: [String], default: [] },
  views: { type: Number, default: 0 },
}, { timestamps: true });

KnowledgeBaseSchema.index({ guildId: 1, tags: 1 });
export const KnowledgeBase = mongoose.model<IKnowledgeBase>("KnowledgeBase", KnowledgeBaseSchema);

export interface IShop extends Document {
  guildId: string;
  itemId: string;
  name: string;
  description: string;
  price: number;
  type: "role" | "item" | "consumable" | "cosmetic" | "special";
  stock: number;
  unlimited: boolean;
  active: boolean;
}

const ShopSchema = new Schema<IShop>({
  guildId: { type: String, required: true, index: true },
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["role", "item", "consumable", "cosmetic", "special"], default: "item" },
  stock: { type: Number, default: -1 },
  unlimited: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
}, { timestamps: true });

ShopSchema.index({ guildId: 1, itemId: 1 }, { unique: true });
export const Shop = mongoose.model<IShop>("Shop", ShopSchema);
