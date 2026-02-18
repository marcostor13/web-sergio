import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './src/models/User.ts';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sergio-nolasco';

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = 'admin@admin.com';
        const existingAdmin = await (User as any).findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin already exists');
        } else {
            const hashedPassword = await bcrypt.hash('@Admin2026', 10);
            const admin = new User({
                email: adminEmail,
                password: hashedPassword,
                name: 'Administrador',
                role: 'admin',
                phone: '00000000',
                imo: 'Admin Mission'
            });
            await admin.save();
            console.log('Admin user created successfully');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
}

seedAdmin();
