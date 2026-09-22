// ============================================
// NOTIX NEXUS - Shared Types
// ============================================

export interface NexusUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  flags?: number;
}

export interface NexusGuild {
  id: string;
  name: string;
  icon?: string;
  ownerId: string;
  memberCount: number;
  boostLevel: number;
  boostCount: number;
}

export interface NexusChannel {
  id: string;
  name: string;
  type: number;
  guildId: string;
}

export interface NexusRole {
  id: string;
  name: string;
  color: number;
  position: number;
}

export interface ModerationCase {
  id: string;
  guildId: string;
  userId: string;
  moderatorId: string;
  type: "warn" | "mute" | "kick" | "ban" | "unban" | "timeout";
  reason: string;
  duration?: number;
  evidence?: string;
  createdAt: Date;
}

export interface RaidEvent {
  id: string;
  guildId: string;
  detectedAt: Date;
  joinCount: number;
  accountsKickd: number;
  lockdownActivated: boolean;
  resolvedBy?: string;
}

export interface Ticket {
  id: string;
  guildId: string;
  channelId: string;
  creatorId: string;
  assignedTo?: string;
  category: string;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high";
  messages: TicketMessage[];
  createdAt: Date;
  closedAt?: Date;
}

export interface TicketMessage {
  id: string;
  authorId: string;
  content: string;
  timestamp: Date;
}

export interface AutoModRule {
  id: string;
  guildId: string;
  type: "spam" | "links" | "invites" | "words" | "caps" | "scam";
  enabled: boolean;
  action: "delete" | "warn" | "mute" | "kick" | "ban";
  threshold?: number;
  punishment?: number;
  words?: string[];
  whitelistedLinks?: string[];
}

export interface ScamResult {
  isScam: boolean;
  confidence: number;
  detections: string[];
  category: string[];
}

export interface LinkCheckResult {
  safe: boolean;
  riskScore: number;
  reasons: string[];
}

export interface DuplicateResult {
  isDuplicate: boolean;
  isSelfSpam: boolean;
  offenderCount: number;
}

export interface AccountRisk {
  score: number;
  reasons: string[];
  isNewAccount: boolean;
  hasSuspiciousUsername: boolean;
}

export interface SecurityStatus {
  raidProtection: boolean;
  lockdownActive: boolean;
  autoModEnabled: boolean;
  recentThreats: number;
  accountsMonitored: number;
}

export interface LevelData {
  userId: string;
  guildId: string;
  level: number;
  xp: number;
  totalXp: number;
  lastXpTime: Date;
}

export interface EconomyData {
  userId: string;
  guildId: string;
  wallet: number;
  bank: number;
  lastDaily?: Date;
  lastWork?: Date;
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export interface Profile {
  userId: string;
  username: string;
  avatar?: string;
  bio?: string;
  reputation: number;
  marriedTo?: string;
  badges: string[];
  createdAt: Date;
}

export interface CustomCommand {
  guildId: string;
  trigger: string;
  response: string;
  createdBy: string;
}

export interface ReactionRoleData {
  guildId: string;
  channelId: string;
  messageId: string;
  emoji: string;
  roleId: string;
}

export interface Giveaway {
  id: string;
  guildId: string;
  channelId: string;
  messageId: string;
  prize: string;
  winnerCount: number;
  winners?: string[];
  endedAt?: Date;
  createdBy: string;
}

export interface Reminder {
  userId: string;
  channelId: string;
  message: string;
  time: Date;
  recurring: boolean;
}

export interface StarboardEntry {
  guildId: string;
  channelId: string;
  messageId: string;
  starboardMessageId?: string;
  stars: number;
  authorId: string;
}

export interface AutoResponse {
  guildId: string;
  trigger: string;
  response: string;
  enabled: boolean;
}
