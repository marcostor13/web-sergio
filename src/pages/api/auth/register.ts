import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../lib/mongodb';
import { User } from '../../../models/User';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email, password, name, phone, imo } = await request.json();

        if (!email || !password || !name) {
            return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), { status: 400 });
        }

        await connectDB();

        const existingUser = await (User as any).findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'El usuario ya existe' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            phone,
            imo,
            role: 'user' // Explicitly set as user
        });
        await newUser.save();

        return new Response(JSON.stringify({ message: 'Usuario registrado exitosamente' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
    }
};
