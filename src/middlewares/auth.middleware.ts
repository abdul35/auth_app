import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, (process.env.ACCESS_TOKEN_KEY as string), (err, details) => {
            if (err) {
                res.sendStatus(401).send('Invalid tokek')
                return next(err);
            }
            const { userId } = details as { userId: number };

            res.locals.userId = userId;
        })
        next();

    }
}