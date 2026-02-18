import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Asegurar carga de variables de entorno
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || import.meta.env.MONGODB_URI;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI no está definida en el entorno.');
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        // Log obfuscated URI for debugging
        const obfuscated = MONGODB_URI.replace(/:([^@]+)@/, ':****@');
        console.log(`🔌 Intentando conectar a: ${obfuscated}`);

        await mongoose.connect(MONGODB_URI);
        console.log('🚀 MongoDB Connected to Atlas');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        throw error;
    }
};
