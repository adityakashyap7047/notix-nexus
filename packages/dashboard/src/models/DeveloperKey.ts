import mongoose, { Schema, Document } from "mongoose";
import { IDeveloperKey } from "../types";

const DeveloperKeySchema = new Schema<IDeveloperKey>(
  {
    userId: { type: String, required: true, index: true },
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    permissions: [{ type: String }],
    lastUsed: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

DeveloperKeySchema.index({ key: 1 });

export const DeveloperKey = mongoose.model<IDeveloperKey>(
  "DeveloperKey",
  DeveloperKeySchema
);
