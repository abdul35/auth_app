import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
    constructor() { }

    public async createUser(email: string, password: string): Promise<User> {
        try {
            return await prisma.user.create({
                data: {
                    email,
                    password
                }
            })
        } catch (error) {
            throw error;
        }
    }

    public async findUser(email: string, password: string): Promise<User | null> {
        try {
            return await prisma.user.findFirst({
                where: {
                    email
                }
            })
        } catch (error) {
            throw error;
        }
    }



}
const f = new AuthService()