import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types";

const GuildMembershipSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    icon: { type: String, default: null },
    owner: { type: Boolean, default: false },
    permissions: { type: Number, default: 0 },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    discordId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    avatar: { type: String, default: null },
    email: { type: String, default: null },
    guilds: [GuildMembershipSchema],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
