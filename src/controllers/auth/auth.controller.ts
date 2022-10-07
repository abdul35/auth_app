import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import { AuthService } from "@services/auth.service";
import { logger } from '@logger/index';
import { TokenService } from "@services/token.service";

const authService = new AuthService();
const tokenService = new TokenService();

export class AuthController {
    constructor() { }

    public async signup(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email.length || typeof email !== 'string' ||
                !password.length || typeof password !== 'string') {
                return res
                    .status(400)
                    .send("Invalid email or password");
            }

            const user = await authService.findUser(email, password);

            if (user) {
                return res
                    .status(400)
                    .send("User with given email already exist");
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const { id } = await authService.createUser(email, hashPassword);

            logger.info('User created successfully');
            return res.send('User created successfully, with userId = ' + id);
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Server error.');
        }
    }



    public async signin(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || typeof email !== 'string' ||
                !password || typeof password !== 'string') {
                return res
                    .status(400)
                    .send("Invalid email or password");
            }

            const user = await authService.findUser(email, password);

            if (!user) {
                logger.info('User not found');
                return res.status(400).send('User not registred with this email - ' + email);
            }

            if (user) {
                const checkedPassword = await bcrypt.compare(password, user.password)
                if (!checkedPassword) {
                    return res.status(400).send('Wrong password!');
                }
            }

            const { accessToken, refreshToken } = await tokenService.generateTokens(user.id);
            return res.json({ accessToken, refreshToken });
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Server error.');
        }
    }


    public refresh(req: Request, res: Response): Response | void {
        try {
            const { refreshToken } = req.body;
            let accessToken;

            if (refreshToken && typeof refreshToken === 'string') {

                JWT.verify(refreshToken, (process.env.REFRESH_TOKEN_KEY as string), (err, decode) => {
                    if (err) {
                        logger.error(err.message);
                        return res.status(400).send(err.message);
                    }

                    let decodeWithCustomType = decode as { userId: number };

                    accessToken = tokenService.generateToken(
                        decodeWithCustomType.userId,
                        process.env.ACCESS_TOKEN_KEY as string,
                        process.env.ACCESS_TOKEN_EXPIRESIN as string,
                    )

                    return res.json({ accessToken });
                })
            }
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Server error.');
        }
    }

    public async logout(req: Request, res: Response) {
        try {
            const { authorization } = req.headers;

            if (authorization) {
                try {
                    const userToken = await tokenService.findToken(authorization);
                    if (!userToken) return res.status(200).send("Logged Out Sucessfully");

                    await tokenService.destroy(userToken);
                } catch (err) {
                    return res.send(err.name);
                }

                res.status(200).send("Logged Out Sucessfully");
            }

            return res.send('logout is work')
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Server error.');
        }
    }

    public info(req: Request, res: Response) {
        try {
            const toeken = req.headers.authorization;

            if (toeken && typeof toeken === 'string') {
                JWT.verify(toeken, (process.env.ACCESS_TOKEN_KEY as string), (err, decode) => {
                    if (err) {
                        logger.error(err);
                        return res.send(err.name);
                    }

                    let decodeWithCustomType = decode as { userId: number };

                    return res.send(`${decodeWithCustomType.userId}`);
                })
            }
        } catch (error) {
            logger.error(error);
            return res.status(500).send('Server error.');
        }
    }

}
