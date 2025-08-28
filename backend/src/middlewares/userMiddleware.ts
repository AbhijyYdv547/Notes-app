import type { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export function middleware(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId:string}

        if (!decoded || !decoded.userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        req.userId = parseInt(decoded.userId);
        
        next();
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}