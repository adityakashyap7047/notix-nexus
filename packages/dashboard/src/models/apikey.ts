import mongoose from 'mongoose';

export interface IApiKey {
  _id?: mongoose.Types.ObjectId;
  key: string;
  userId: string;
  name: string;
  permissions: string[];
  rateLimit: number;
  lastUsed: Date | null;
  usageCount: number;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
}

const apiKeySchema = new mongoose.Schema<IApiKey>(
  {
    key: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    permissions: { type: [String], default: ['read'] },
    rateLimit: { type: Number, default: 100 },
    lastUsed: { type: Date, default: null },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

apiKeySchema.index({ key: 1 });
apiKeySchema.index({ userId: 1 });

export const ApiKey = mongoose.model<IApiKey>('ApiKey', apiKeySchema);
