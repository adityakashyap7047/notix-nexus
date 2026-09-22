import mongoose, { Schema, Document } from "mongoose";
import { ITicket, ITicketMessage } from "../types";

const TicketMessageSchema = new Schema<ITicketMessage>(
  {
    authorId: { type: String, required: true },
    authorTag: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const TicketSchema = new Schema<ITicket>(
  {
    guildId: { type: String, required: true, index: true },
    channelId: { type: String, required: true, unique: true },
    creatorId: { type: String, required: true },
    creatorTag: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["open", "closed", "pending"],
      default: "open",
    },
    assignedTo: { type: String, default: null },
    category: { type: String, default: null },
    messages: [TicketMessageSchema],
  },
  {
    timestamps: true,
  }
);

TicketSchema.index({ guildId: 1, status: 1 });
TicketSchema.index({ guildId: 1, creatorId: 1 });

export const Ticket = mongoose.model<ITicket>("Ticket", TicketSchema);
