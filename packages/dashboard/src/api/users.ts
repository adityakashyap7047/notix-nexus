import { Router, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { requireAuth } from "../middleware/auth";
import { User } from "../models/User";

const router = Router();

router.get("/me", requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user as any;
  res.json({
    _id: user._id,
    discordId: user.discordId,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    email: user.email,
    guilds: user.guilds || [],
  });
});

router.get("/:id", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findOne({ discordId: req.params.id })
      .select("discordId username discriminator avatar createdAt")
      .lean();

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

export default router;
