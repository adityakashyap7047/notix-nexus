import { EmbedBuilder, Guild, GuildMember, User } from "discord.js";
import { COLORS, EMBED_CONFIG } from "../constants";

export function createEmbed(options: {
  title?: string;
  description?: string;
  color?: string;
  author?: { name: string; iconUrl?: string };
  footer?: { text: string; iconUrl?: string };
  fields?: { name: string; value: string; inline?: boolean }[];
  thumbnail?: string;
  image?: string;
  timestamp?: boolean;
}): EmbedBuilder {
  const embed = new EmbedBuilder();

  if (options.title) embed.setTitle(options.title);
  if (options.description) embed.setDescription(options.description);
  if (options.color) embed.setColor(options.color as `#${string}`);
  else embed.setColor(COLORS.accent.cyan as `#${string}`);

  if (options.author) {
    embed.setAuthor({
      name: options.author.name,
      iconURL: options.author.iconUrl,
    });
  }

  if (options.footer) {
    embed.setFooter({ text: options.footer.text, iconURL: options.footer.iconUrl });
  } else {
    embed.setFooter({ text: EMBED_CONFIG.defaultFooter.text });
  }

  if (options.fields) {
    for (const field of options.fields) {
      embed.addFields({ name: field.name, value: field.value, inline: field.inline });
    }
  }

  if (options.thumbnail) embed.setThumbnail(options.thumbnail);
  if (options.image) embed.setImage(options.image);
  if (options.timestamp !== false) embed.setTimestamp();

  return embed;
}

export function nexusEmbed(data: {
  title?: string;
  description?: string;
  color?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
}): EmbedBuilder {
  return createEmbed({
    title: data.title ? `◈ ${data.title}` : undefined,
    description: data.description,
    color: data.color || COLORS.accent.cyan,
    fields: data.fields,
  });
}

export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function getSecurityColor(level: string): string {
  switch (level) {
    case "nominal": return COLORS.security.nominal;
    case "elevated": return COLORS.security.elevated;
    case "high": return COLORS.security.high;
    case "critical": return COLORS.security.critical;
    default: return COLORS.text.muted;
  }
}

export function getStatusEmoji(status: string): string {
  switch (status) {
    case "online": case "ready": case "connected": return "🟢";
    case "idle": case "connecting": return "🟡";
    case "dnd": case "reconnecting": case "error": return "🔴";
    case "offline": case "disconnected": return "⚫";
    default: return "⚪";
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + "...";
}

export function codeBlock(content: string, language?: string): string {
  return `\`\`\`${language || ""}\n${content}\n\`\`\``;
}

export function getTimezoneOffset(): string {
  const offset = new Date().getTimezoneOffset();
  const sign = offset <= 0 ? "+" : "-";
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset / 60).toString().padStart(2, "0");
  const minutes = (absOffset % 60).toString().padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}
