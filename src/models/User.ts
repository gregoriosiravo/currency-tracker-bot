import mongoose, { Document, Schema } from 'mongoose';

interface ITrackedCurrency {
  currency: string;
  goal: number;
}

export interface IUser extends Document {
  chatId: string;
  trackedCurrencies: ITrackedCurrency[];
}

const TrackedCurrencySchema = new Schema<ITrackedCurrency>({
  currency: { type: String, required: true },
  goal: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  chatId: { type: String, required: true, unique: true },
  trackedCurrencies: { type: [TrackedCurrencySchema], default: [] },
});

export const User = mongoose.model<IUser>('User', userSchema);
