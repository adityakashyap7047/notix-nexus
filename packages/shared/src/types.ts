export interface GuildConfig {
  guildId: string;
  prefix: string;
  welcomeChannel: string | null;
  loggingChannel: string | null;
  modRole: string | null;
  autoMod: AutoModConfig;
  enabledModules: string[];
}

export interface UserData {
  userId: string;
  guildId: string;
  coins: number;
  xp: number;
  level: number;
  reputation: number;
  dailyStreak: number;
  lastDaily: string | null;
  inventory: string[];
  achievements: string[];
}

export interface Warning {
  id: string;
  userId: string;
  guildId: string;
  moderatorId: string;
  reason: string;
  timestamp: string;
  active: boolean;
}

export interface Ticket {
  id: string;
  guildId: string;
  userId: string;
  channelId: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "pending" | "closed" | "resolved";
  staffId: string | null;
  messages: TicketMessage[];
  createdAt: string;
  closedAt: string | null;
}

export interface TicketMessage {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
  attachments: string[];
}

export interface Giveaway {
  id: string;
  guildId: string;
  channelId: string;
  messageId: string;
  hostId: string;
  prize: string;
  winnerCount: number;
  winners: string[];
  requirements: GiveawayRequirements;
  endsAt: string;
  ended: boolean;
}

export interface GiveawayRequirements {
  minAccountAge?: number;
  requiredRoles?: string[];
  excludedRoles?: string[];
  minMessages?: number;
  minLevel?: number;
}

export interface AutoModConfig {
  enabled: boolean;
  antiSpam: boolean;
  antiRaid: boolean;
  antiLink: boolean;
  antiInvite: boolean;
  antiCaps: boolean;
  antiEmoji: boolean;
  badWords: string[];
  scamLinks: string[];
  maxMentions: number;
  maxMessages: number;
  timeWindow: number;
}

export interface WelcomeConfig {
  enabled: boolean;
  channelId: string;
  dmMessage: string;
  autoRoles: string[];
  verificationRequired: boolean;
  accountAgeDays: number;
}

export interface LevelConfig {
  enabled: boolean;
  xpPerMessage: number;
  xpCooldown: number;
  voiceXp: boolean;
  multiplier: number;
  roleRewards: LevelRoleReward[];
}

export interface LevelRoleReward {
  level: number;
  roleId: string;
}

export interface AnnouncementConfig {
  enabled: boolean;
  defaultChannel: string;
  embedColor: string;
  pingRole: string | null;
}

export interface EconomyConfig {
  enabled: boolean;
  dailyReward: number;
  workMin: number;
  workMax: number;
  shopItems: ShopItem[];
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "role" | "cosmetic" | "consumable" | "special";
  stock: number | null;
  roleId: string | null;
}

export interface TicketConfig {
  enabled: boolean;
  categoryId: string;
  categories: string[];
  maxTickets: number;
  staffRoles: string[];
}

export interface GiveawayConfig {
  enabled: boolean;
  defaultDuration: number;
  minAccountAge: number;
  bonusRoles: string[];
}

export interface ModerationConfig {
  enabled: boolean;
  logChannel: string;
  maxWarns: number;
  autoAction: "none" | "mute" | "kick" | "ban";
}

export interface AnalyticsConfig {
  enabled: boolean;
  trackingMessages: boolean;
  trackingVoice: boolean;
  trackingJoins: boolean;
}

export interface EventConfig {
  id: string;
  name: string;
  description: string;
  channelId: string;
  startTime: string;
  endTime: string;
  hostId: string;
  attendees: string[];
  maxAttendees: number | null;
}

export interface AutomationRule {
  id: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  enabled: boolean;
}

export interface AutomationTrigger {
  type: "message" | "join" | "leave" | "role" | "channel" | "schedule";
  value: string;
}

export interface AutomationCondition {
  type: "role" | "channel" | "user" | "time" | "contains" | "regex";
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than" | "matches";
  value: string | number | boolean;
}

export interface AutomationAction {
  type: "send_message" | "add_role" | "remove_role" | "mute" | "kick" | "ban" | "timeout" | "log" | "webhook";
  target?: string;
  value: string;
}

export interface AIConfig {
  persona: string;
  personality: string;
  tone: string;
  enabledModules: string[];
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
}

export interface ReputationEntry {
  fromUser: string;
  toUser: string;
  type: "positive" | "neutral" | "negative";
  reason: string;
  timestamp: string;
}

export interface LeaderboardEntry {
  userId: string;
  value: number;
  rank: number;
}

export interface CommandStats {
  command: string;
  uses: number;
  lastUsed: string;
}

export interface ShardInfo {
  id: number;
  status: "ready" | "connecting" | "reconnecting" | "idle" | "dead";
  latency: number;
  servers: number;
  users: number;
}

export interface BotStats {
  totalGuilds: number;
  totalUsers: number;
  totalCommands: number;
  uptime: number;
  shards: ShardInfo[];
  memoryUsage: NodeJS.MemoryUsage;
}

export interface DashboardUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  guilds: DashboardGuild[];
}

export interface DashboardGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: number;
  hasBot: boolean;
}

export interface AuditLogEntry {
  id: string;
  guildId: string;
  userId: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
}

export interface Embed {
  title?: string;
  description?: string;
  color?: string;
  thumbnail?: string;
  image?: string;
  footer?: string;
  timestamp?: string;
  fields?: EmbedField[];
  author?: EmbedAuthor;
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedAuthor {
  name: string;
  icon?: string;
  url?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: PaginationOptions;
}

export interface RateLimitEntry {
  userId: string;
  command: string;
  lastUsed: number;
  uses: number;
}

export interface VoiceSession {
  userId: string;
  guildId: string;
  channelId: string;
  joinedAt: string;
  xpEarned: number;
}

export interface MessageLog {
  id: string;
  guildId: string;
  channelId: string;
  userId: string;
  content: string;
  action: "send" | "edit" | "delete";
  timestamp: string;
}

export interface JoinLeaveLog {
  guildId: string;
  userId: string;
  action: "join" | "leave" | "kick" | "ban";
  moderatorId?: string;
  reason?: string;
  timestamp: string;
}

export interface ChannelConfig {
  channelId: string;
  type: "text" | "voice" | "category" | "announcement" | "stage";
  name: string;
  nsfw: boolean;
  slowmode: number;
  topic: string | null;
}

export interface RoleConfig {
  roleId: string;
  name: string;
  color: string;
  hoist: boolean;
  mentionable: boolean;
  position: number;
  permissions: string[];
}
