import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { User } from "../models/User";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const DISCORD_CALLBACK_URL = process.env.DISCORD_CALLBACK_URL || "http://localhost:3000/auth/callback";

export function configurePassport(): void {
  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as any).id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error as Error);
    }
  });

  passport.use(
    new DiscordStrategy(
      {
        clientID: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
        callbackURL: DISCORD_CALLBACK_URL,
        scope: ["identify", "guilds"],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: Error | null, user?: any) => void
      ) => {
        try {
          const guilds = profile.guilds || [];

          let user = await User.findOne({ discordId: profile.id });

          if (user) {
            user.username = profile.username;
            user.discriminator = profile.discriminator;
            user.avatar = profile.avatar;
            user.email = profile.email || null;
            user.guilds = guilds;
            await user.save();
          } else {
            user = await User.create({
              discordId: profile.id,
              username: profile.username,
              discriminator: profile.discriminator,
              avatar: profile.avatar,
              email: profile.email || null,
              guilds,
            });
          }

          return done(null, user);
        } catch (error) {
          return done(error as Error);
        }
      }
    )
  );
}

export default passport;
