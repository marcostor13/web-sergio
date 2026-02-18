import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/mongodb';
import { FuturoImposible } from '../../../models/FuturoImposible';
import { User } from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies, url }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token) as any;
        if (!decoded || decoded.role !== 'admin') {
            return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 403 });
        }

        const search = url.searchParams.get('q') || '';

        await connectDB();

        // Query to find FIs with user info
        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        const fis = await (FuturoImposible as any).find(query)
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        return new Response(JSON.stringify(fis), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
};
