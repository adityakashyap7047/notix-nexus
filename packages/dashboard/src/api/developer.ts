import { Router, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { requireAuth } from "../middleware/auth";
import { DeveloperKey } from "../models/DeveloperKey";
import crypto from "crypto";

const router = Router();

function generateApiKey(): string {
  return `notix_${crypto.randomBytes(32).toString("hex")}`;
}

router.get("/keys", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = (req.user as any).discordId;
    const keys = await DeveloperKey.find({ userId })
      .select("-key")
      .sort({ createdAt: -1 })
      .lean();

    res.json(keys);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch API keys" });
  }
});

router.post("/keys", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = (req.user as any).discordId;
    const { name, permissions } = req.body;

    if (!name || typeof name !== "string") {
      res.status(400).json({ error: "Key name is required" });
      return;
    }

    if (name.length > 50) {
      res.status(400).json({ error: "Key name too long (max 50 characters)" });
      return;
    }

    const existingKeys = await DeveloperKey.countDocuments({ userId });
    if (existingKeys >= 10) {
      res.status(400).json({ error: "Maximum 10 API keys allowed" });
      return;
    }

    const key = generateApiKey();
    const validPermissions = ["read", "write", "admin"];
    const filteredPermissions = (permissions || []).filter((p: string) =>
      validPermissions.includes(p)
    );

    const developerKey = await DeveloperKey.create({
      userId,
      key,
      name,
      permissions: filteredPermissions.length > 0 ? filteredPermissions : ["read"],
    });

    res.status(201).json({
      _id: developerKey._id,
      name: developerKey.name,
      key: developerKey.key,
      permissions: developerKey.permissions,
      createdAt: developerKey.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create API key" });
  }
});

router.delete("/keys/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = (req.user as any).discordId;
    const keyId = req.params.id;

    const key = await DeveloperKey.findOne({ _id: keyId, userId });
    if (!key) {
      res.status(404).json({ error: "API key not found" });
      return;
    }

    await DeveloperKey.findByIdAndDelete(keyId);
    res.json({ message: "API key deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete API key" });
  }
});

export default router;
