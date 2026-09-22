import { Router, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { requireAuth, requireGuild } from "../middleware/auth";
import { GuildSettings } from "../models/GuildSettings";
import { ModLog } from "../models/ModLog";
import { Ticket } from "../models/Ticket";
import { ServerAnalytics } from "../models/ServerAnalytics";

const router = Router();

router.get("/", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user as any;
  res.json(user.guilds || []);
});

router.get("/:id", requireAuth, requireGuild, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const settings = await GuildSettings.findOne({ guildId: req.params.id });
    if (!settings) {
      res.status(404).json({ error: "Guild settings not found" });
      return;
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guild settings" });
  }
});

router.put("/:id", requireAuth, requireGuild, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      welcomeChannel,
      welcomeMessage,
      autoRole,
      modLogChannel,
      ticketCategory,
      ticketLogChannel,
      aiEnabled,
      aiPersona,
      features,
      prefix,
    } = req.body;

    const settings = await GuildSettings.findOneAndUpdate(
      { guildId: req.params.id },
      {
        ...(welcomeChannel !== undefined && { welcomeChannel }),
        ...(welcomeMessage !== undefined && { welcomeMessage }),
        ...(autoRole !== undefined && { autoRole }),
        ...(modLogChannel !== undefined && { modLogChannel }),
        ...(ticketCategory !== undefined && { ticketCategory }),
        ...(ticketLogChannel !== undefined && { ticketLogChannel }),
        ...(aiEnabled !== undefined && { aiEnabled }),
        ...(aiPersona !== undefined && { aiPersona }),
        ...(features !== undefined && { features }),
        ...(prefix !== undefined && { prefix }),
      },
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: "Failed to update guild settings" });
  }
});

router.get("/:id/stats", requireAuth, requireGuild, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const guildId = req.params.id;
    const latestAnalytics = await ServerAnalytics.findOne({ guildId })
      .sort({ date: -1 })
      .lean();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const analyticsHistory = await ServerAnalytics.find({
      guildId,
      date: { $gte: thirtyDaysAgo },
    })
      .sort({ date: 1 })
      .lean();

    const ticketCount = await Ticket.countDocuments({ guildId, status: "open" });
    const modActionCount = await ModLog.countDocuments({
      guildId,
      createdAt: { $gte: thirtyDaysAgo },
    });

    const memberCount = latestAnalytics?.memberCount || 0;
    const messageCount = analyticsHistory.reduce(
      (sum, day) => sum + (day.messageCount || 0),
      0
    );
    const commandsUsed = analyticsHistory.reduce(
      (sum, day) => sum + (day.commandsUsed || 0),
      0
    );

    res.json({
      memberCount,
      messageCount,
      commandsUsed,
      openTickets: ticketCount,
      moderationActions: modActionCount,
      history: analyticsHistory,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch guild stats" });
  }
});

router.get(
  "/:id/moderation",
  requireAuth,
  requireGuild,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const skip = (page - 1) * limit;

      const logs = await ModLog.find({ guildId: req.params.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await ModLog.countDocuments({ guildId: req.params.id });

      res.json({
        logs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch moderation logs" });
    }
  }
);

router.get(
  "/:id/tickets",
  requireAuth,
  requireGuild,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const status = req.query.status as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 25;
      const skip = (page - 1) * limit;

      const filter: any = { guildId: req.params.id };
      if (status) {
        filter.status = status;
      }

      const tickets = await Ticket.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Ticket.countDocuments(filter);

      res.json({
        tickets,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  }
);

router.get(
  "/:id/analytics",
  requireAuth,
  requireGuild,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const analytics = await ServerAnalytics.find({
        guildId: req.params.id,
        date: { $gte: startDate },
      })
        .sort({ date: 1 })
        .lean();

      const summary = analytics.reduce(
        (acc, day) => ({
          totalMessages: acc.totalMessages + (day.messageCount || 0),
          totalCommands: acc.totalCommands + (day.commandsUsed || 0),
          totalTickets: acc.totalTickets + (day.ticketsCreated || 0),
          totalModActions: acc.totalModActions + (day.moderationActions || 0),
          peakMembers: Math.max(acc.peakMembers, day.memberCount || 0),
        }),
        {
          totalMessages: 0,
          totalCommands: 0,
          totalTickets: 0,
          totalModActions: 0,
          peakMembers: 0,
        }
      );

      res.json({
        period: `${days} days`,
        summary,
        daily: analytics,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  }
);

export default router;
