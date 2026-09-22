import { Router, Request, Response } from "express";
import passport from "passport";

const router = Router();

router.get("/login", passport.authenticate("discord", { scope: ["identify", "guilds"] }));

router.get(
  "/callback",
  passport.authenticate("discord", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/dashboard`);
  }
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to logout" });
      return;
    }
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        res.status(500).json({ error: "Failed to destroy session" });
        return;
      }
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      res.redirect(frontendUrl);
    });
  });
});

router.get("/me", (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  const user = req.user as any;
  res.json({
    _id: user._id,
    discordId: user.discordId,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
    email: user.email,
  });
});

export default router;
