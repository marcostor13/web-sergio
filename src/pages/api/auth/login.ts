import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../lib/mongodb';
import { User } from '../../../models/User';

const JWT_SECRET = import.meta.env?.JWT_SECRET || process.env.JWT_SECRET || 'your_fallback_secret';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Todos los campos son obligatorios' }), { status: 400 });
        }

        await connectDB();

        const user = await (User as any).findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 400 });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        cookies.set('token', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return new Response(JSON.stringify({ message: 'Login exitoso', name: user.name }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
    }
};
