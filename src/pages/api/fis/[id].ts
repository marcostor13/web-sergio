import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/mongodb';
import { FuturoImposible } from '../../../models/FuturoImposible';
import { verifyToken } from '../../../lib/auth';

export const PATCH: APIRoute = async ({ params, request, cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return new Response(null, { status: 401 });

        const { id } = params;
        const body = await request.json();

        await connectDB();
        const updatedFI = await (FuturoImposible as any).findOneAndUpdate(
            { _id: id, user: decoded.userId },
            { $set: body },
            { new: true }
        );

        if (!updatedFI) return new Response(null, { status: 404 });

        return new Response(JSON.stringify(updatedFI), { status: 200 });
    } catch (error) {
        return new Response(null, { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
    try {
        const token = cookies.get('token')?.value;
        if (!token) return new Response(null, { status: 401 });

        const decoded = verifyToken(token);
        if (!decoded) return new Response(null, { status: 401 });

        const { id } = params;

        await connectDB();
        const result = await FuturoImposible.deleteOne({ _id: id, user: decoded.userId });

        if (result.deletedCount === 0) return new Response(null, { status: 404 });

        return new Response(JSON.stringify({ message: 'Futuro Imposible eliminado' }), { status: 200 });
    } catch (error) {
        return new Response(null, { status: 500 });
    }
};
