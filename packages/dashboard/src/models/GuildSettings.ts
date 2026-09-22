import mongoose, { Schema, Document } from "mongoose";
import { IGuildSettings } from "../types";

const GuildSettingsSchema = new Schema<IGuildSettings>(
  {
    guildId: { type: String, required: true, unique: true, index: true },
    guildName: { type: String, required: true },
    welcomeChannel: { type: String, default: null },
    welcomeMessage: { type: String, default: null },
    autoRole: { type: String, default: null },
    modLogChannel: { type: String, default: null },
    ticketCategory: { type: String, default: null },
    ticketLogChannel: { type: String, default: null },
    aiEnabled: { type: Boolean, default: false },
    aiPersona: { type: String, default: "default" },
    features: { type: Schema.Types.Mixed, default: {} },
    prefix: { type: String, default: "!" },
  },
  {
    timestamps: true,
  }
);

export const GuildSettings = mongoose.model<IGuildSettings>(
  "GuildSettings",
  GuildSettingsSchema
);
