import type { APIRoute } from "astro";
import { verifyToken } from "../../../lib/auth";
import { connectDB } from "../../../lib/mongodb";
import { User } from "../../../models/User";

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
      });
    }

    const decoded = verifyToken(token) as {
      userId: string;
      role?: string;
    } | null;
    if (!decoded) {
      return new Response(JSON.stringify({ message: "Token inválido" }), {
        status: 401,
      });
    }

    await connectDB();
    const user = await (User as any)
      .findById(decoded.userId)
      .select("name email role");
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role || "user",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error interno" }), {
      status: 500,
    });
  }
};
