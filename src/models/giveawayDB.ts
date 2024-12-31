import { Schema, model, Document } from "mongoose";

interface IGiveaway extends Document {
    guildId: string;
    channelId: string;
    messageId: string;
    prize: string;
    prizeDescription: string;
    winnersCount: number;
    startTime: Date;
    endTime: Date;
    participants: { userId: string; username: string }[];
}

const giveawaySchema: Schema = new Schema({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    messageId: { type: String, required: true },
    prize: { type: String, required: true },
    prizeDescription: { type: String, required: true },
    winnersCount: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    participants: { 
        type: [
            {
                userId: { type: String, required: true },
                username: { type: String, required: true }
            }
        ], 
        default: [] 
    },
});

export default model<IGiveaway>("Giveaway", giveawaySchema);
