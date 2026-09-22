import mongoose, { Schema, Document } from "mongoose";
import { IServerAnalytics, IChannelActivity } from "../types";

const ChannelActivitySchema = new Schema<IChannelActivity>(
  {
    channelId: { type: String, required: true },
    channelName: { type: String, required: true },
    messageCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ServerAnalyticsSchema = new Schema<IServerAnalytics>(
  {
    guildId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    memberCount: { type: Number, default: 0 },
    messageCount: { type: Number, default: 0 },
    commandsUsed: { type: Number, default: 0 },
    ticketsCreated: { type: Number, default: 0 },
    moderationActions: { type: Number, default: 0 },
    activeChannels: [ChannelActivitySchema],
  },
  {
    timestamps: true,
  }
);

ServerAnalyticsSchema.index({ guildId: 1, date: -1 });
ServerAnalyticsSchema.index({ guildId: 1, date: 1 }, { unique: true });

export const ServerAnalytics = mongoose.model<IServerAnalytics>(
  "ServerAnalytics",
  ServerAnalyticsSchema
);
