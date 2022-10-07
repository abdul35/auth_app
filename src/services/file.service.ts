import { PrismaClient } from "@prisma/client";
import { ReturnFile, FileToRecord } from "common/file.type";

const prisma = new PrismaClient();

export class FileService {

    constructor() { }

    public async saveFile(file: FileToRecord, userId: number): Promise<ReturnFile | Error> {
        try {
            const fileStored = await prisma.file.create({
                data: {
                    extension: file.mimetype.split('/').pop() as string,
                    size: file.size,
                    type: file.mimetype,
                    originalName: file.originalFilename,
                    ownerId: userId,
                }
            })
            return fileStored;
        } catch (error) {
            throw error;
        }
    }


    public async gitFileList(size: number, page: number) {
        try {
            return await prisma.file.findMany({
                skip: page || 1,
                take: size || 10
            })
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: number) {
        try {
            await prisma.file.delete({ where: { id } });
        } catch (error) {
            throw error;
        }
    }

    public async getFile(id: number) {
        try {
            return await prisma.file.findFirst({ where: { id } });
        } catch (error) {
            throw error
        }
    }
}