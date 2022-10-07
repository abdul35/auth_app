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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class TokenService {
    constructor() { }
    generateTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = this.generateToken(userId, process.env.REFRESH_TOKEN_KEY, process.env.REFRESH_TOKEN_EXPIRESIN);
                const accessToken = this.generateToken(userId, process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_EXPIRESIN);
                const userToken = yield prisma.userToken.findFirst({ where: { userId } });
                if (userToken)
                    yield prisma.userToken.delete({ where: { id: userToken.id } });
                yield prisma.userToken.create({
                    data: {
                        token: refreshToken,
                        userId
                    }
                });
                return { accessToken, refreshToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(userId, key, expiresIn) {
        try {
            return jsonwebtoken_1.default.sign({ userId }, key, { expiresIn });
        }
        catch (error) {
            throw error;
        }
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.userToken.findFirstOrThrow({ where: { token: refreshToken } });
            }
            catch (error) {
                throw error;
            }
        });
    }
    destroy({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.userToken.delete({ where: { id } });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map