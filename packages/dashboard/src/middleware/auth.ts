import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}

export function requireGuild(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const guildId = req.params.id || req.params.guildId;
  if (!guildId) {
    res.status(400).json({ error: "Guild ID required" });
    return;
  }

  const user = req.user as any;
  const guild = user.guilds?.find((g: any) => g.id === guildId);

  if (!guild) {
    res.status(403).json({ error: "You are not a member of this guild" });
    return;
  }

  const MANAGE_GUILD = 0x00000020;
  const hasPermission = (guild.permissions & MANAGE_GUILD) === MANAGE_GUILD;

  if (!hasPermission && !guild.owner) {
    res.status(403).json({ error: "You need Manage Server permission to access this guild" });
    return;
  }

  req.guildId = guildId;
  next();
}
