import { PrismaClient, UserToken } from '@prisma/client';
import JWT from 'jsonwebtoken';

const prisma = new PrismaClient();

export class TokenService {
    constructor() { }

    public async generateTokens(userId: number) {
        try {

            const refreshToken = this.generateToken(
                userId,
                process.env.REFRESH_TOKEN_KEY as string,
                process.env.REFRESH_TOKEN_EXPIRESIN as string
            );
            const accessToken = this.generateToken(
                userId,
                process.env.ACCESS_TOKEN_KEY as string,
                process.env.ACCESS_TOKEN_EXPIRESIN as string
            );

            const userToken = await prisma.userToken.findFirst({ where: { userId } });
            if (userToken) await prisma.userToken.delete({ where: { id: userToken.id } })

            await prisma.userToken.create({
                data: {
                    token: refreshToken,
                    userId
                }
            });

            return { accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    }

    public generateToken(userId: number, key: string, expiresIn: string): string {
        try {
            return JWT.sign({ userId }, key, { expiresIn });
        } catch (error) {
            throw error;
        }
    }


    public async findToken(refreshToken: string): Promise<UserToken | null> {
        try {
            return await prisma.userToken.findFirstOrThrow({ where: { token: refreshToken } });
        } catch (error) {
            throw error;
        }
    }


    public async destroy({ id }: { id: number }) {
        try {
            return await prisma.userToken.delete({ where: { id } });
        } catch (error) {
            throw error;
        }
    }

}