import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env?.JWT_SECRET || process.env.JWT_SECRET || 'your_fallback_secret';

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    } catch (error) {
        return null;
    }
};
