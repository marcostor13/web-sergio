import mongoose from 'mongoose';

const FuturoImposibleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    percentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    evidences: {
        type: [String],
        default: [],
    },
    targetDate: {
        type: Date,
    },
}, { timestamps: true });

export const FuturoImposible = mongoose.models.FuturoImposible || mongoose.model('FuturoImposible', FuturoImposibleSchema);
