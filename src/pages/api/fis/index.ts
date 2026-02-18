import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/mongodb';
import { FuturoImposible } from '../../../models/FuturoImposible';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return new Response(null, { status: 401 });

        await connectDB();
        const fis = await (FuturoImposible as any).find({ user: decoded.userId }).sort({ createdAt: -1 });

        return new Response(JSON.stringify(fis), { status: 200 });
    } catch (error) {
        return new Response(null, { status: 500 });
    }
};

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return new Response(null, { status: 401 });

        const { title, description, targetDate } = await request.json();
        if (!title) return new Response(JSON.stringify({ message: 'Título es obligatorio' }), { status: 400 });

        await connectDB();
        const newFI = new FuturoImposible({
            user: decoded.userId,
            title,
            description,
            targetDate,
        });
        await newFI.save();

        return new Response(JSON.stringify(newFI), { status: 201 });
    } catch (error) {
        return new Response(null, { status: 500 });
    }
};
