"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FileService {
    constructor() { }
    saveFile(file, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileStored = yield prisma.file.create({
                    data: {
                        extension: file.mimetype.split('/').pop(),
                        size: file.size,
                        type: file.mimetype,
                        originalName: file.originalFilename,
                        ownerId: userId,
                    }
                });
                return fileStored;
            }
            catch (error) {
                throw error;
            }
        });
    }
    gitFileList(size, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.file.findMany({
                    skip: page || 1,
                    take: size || 10
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.file.delete({ where: { id } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    getFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.file.findFirst({ where: { id } });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map