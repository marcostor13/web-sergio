import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/mongodb';
import { User } from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

export const PATCH: APIRoute = async ({ request, cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token) as any;
        if (!decoded) return new Response(null, { status: 401 });

        const body = await request.json();

        await connectDB();
        await (User as any).findByIdAndUpdate(decoded.userId, { $set: body });

        return new Response(JSON.stringify({ message: 'Usuario actualizado con éxito' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
    }
};
