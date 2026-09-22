import mongoose, { Schema, Document } from "mongoose";
import { IModLog } from "../types";

const ModLogSchema = new Schema<IModLog>(
  {
    guildId: { type: String, required: true, index: true },
    moderatorId: { type: String, required: true },
    moderatorTag: { type: String, required: true },
    targetId: { type: String, required: true },
    targetTag: { type: String, required: true },
    action: {
      type: String,
      required: true,
      enum: ["ban", "unban", "kick", "timeout", "warn", "mute", "unmute"],
    },
    reason: { type: String, default: null },
    duration: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

ModLogSchema.index({ guildId: 1, createdAt: -1 });
ModLogSchema.index({ guildId: 1, targetId: 1 });

export const ModLog = mongoose.model<IModLog>("ModLog", ModLogSchema);
