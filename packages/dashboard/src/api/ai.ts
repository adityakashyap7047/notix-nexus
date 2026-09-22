import { Router, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { requireAuth } from "../middleware/auth";
import { AIService } from "../services/AIService";

const router = Router();
const aiService = new AIService();

router.post("/chat", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message, persona, guildId } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (message.length > 2000) {
      res.status(400).json({ error: "Message too long (max 2000 characters)" });
      return;
    }

    const response = await aiService.chat({
      message,
      persona: persona || "default",
      userId: (req.user as any).discordId,
      guildId,
    });

    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate AI response" });
  }
});

router.post("/generate", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { type, prompt, options } = req.body;

    if (!type || !prompt) {
      res.status(400).json({ error: "Type and prompt are required" });
      return;
    }

    const validTypes = ["welcome-message", "moderation-response", "ticket-response", "custom"];
    if (!validTypes.includes(type)) {
      res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(", ")}` });
      return;
    }

    const result = await aiService.generate({
      type,
      prompt,
      options: options || {},
      userId: (req.user as any).discordId,
    });

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate content" });
  }
});

export default router;
