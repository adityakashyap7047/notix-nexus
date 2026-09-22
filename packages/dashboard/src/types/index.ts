import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  _id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string | null;
  guilds: IGuildMembership[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGuildMembership {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
}

export interface IGuildSettings extends Document {
  _id: string;
  guildId: string;
  guildName: string;
  welcomeChannel: string | null;
  welcomeMessage: string | null;
  autoRole: string | null;
  modLogChannel: string | null;
  ticketCategory: string | null;
  ticketLogChannel: string | null;
  aiEnabled: boolean;
  aiPersona: string;
  features: Record<string, boolean>;
  prefix: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModLog extends Document {
  _id: string;
  guildId: string;
  moderatorId: string;
  moderatorTag: string;
  targetId: string;
  targetTag: string;
  action: "ban" | "unban" | "kick" | "timeout" | "warn" | "mute" | "unmute";
  reason: string | null;
  duration: number | null;
  createdAt: Date;
}

export interface ITicket extends Document {
  _id: string;
  guildId: string;
  channelId: string;
  creatorId: string;
  creatorTag: string;
  status: "open" | "closed" | "pending";
  assignedTo: string | null;
  category: string | null;
  messages: ITicketMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicketMessage {
  authorId: string;
  authorTag: string;
  content: string;
  timestamp: Date;
}

export interface IServerAnalytics extends Document {
  _id: string;
  guildId: string;
  date: Date;
  memberCount: number;
  messageCount: number;
  commandsUsed: number;
  ticketsCreated: number;
  moderationActions: number;
  activeChannels: IChannelActivity[];
}

export interface IChannelActivity {
  channelId: string;
  channelName: string;
  messageCount: number;
}

export interface IApiUser {
  _id: string;
  discordId: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string | null;
}

export interface IDeveloperKey extends Document {
  _id: string;
  userId: string;
  key: string;
  name: string;
  permissions: string[];
  lastUsed: Date | null;
  createdAt: Date;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  guildId?: string;
}

export interface DiscordProfile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
  guilds?: IGuildMembership[];
}

export interface SessionData {
  passport?: {
    user: string;
  };
}

declare global {
  namespace Express {
    interface User {
      _id: string;
      discordId: string;
      username: string;
      discriminator: string;
      avatar: string | null;
      email: string | null;
    }
  }
}
