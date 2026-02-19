import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/mongodb';
import { FuturoImposible } from '../../../models/FuturoImposible';
import { verifyToken } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token) as any;
        if (!decoded) return new Response(null, { status: 401 });

        const { fis } = await request.json();

        if (!fis || !Array.isArray(fis) || fis.length === 0) {
            return new Response(JSON.stringify({ message: 'No se enviaron Futuros Imposibles' }), { status: 400 });
        }

        await connectDB();

        const fiObjects = fis.map(title => ({
            title,
            description: '',
            user: decoded.userId,
            percentage: 0
        }));

        await (FuturoImposible as any).insertMany(fiObjects);

        return new Response(JSON.stringify({ message: 'Futuros Imposibles agregados con éxito' }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Error interno del servidor' }), { status: 500 });
    }
};
