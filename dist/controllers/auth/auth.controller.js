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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("@services/auth.service");
const index_1 = require("@logger/index");
const token_service_1 = require("@services/token.service");
const authService = new auth_service_1.AuthService();
const tokenService = new token_service_1.TokenService();
class AuthController {
    constructor() { }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email.length || typeof email !== 'string' ||
                    !password.length || typeof password !== 'string') {
                    return res
                        .status(400)
                        .send("Invalid email or password");
                }
                const user = yield authService.findUser(email, password);
                if (user) {
                    return res
                        .status(400)
                        .send("User with given email already exist");
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
                const { id } = yield authService.createUser(email, hashPassword);
                index_1.logger.info('User created successfully');
                return res.send('User created successfully, with userId = ' + id);
            }
            catch (error) {
                index_1.logger.error(error);
                return res.status(500).send('Server error.');
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || typeof email !== 'string' ||
                    !password || typeof password !== 'string') {
                    return res
                        .status(400)
                        .send("Invalid email or password");
                }
                const user = yield authService.findUser(email, password);
                if (!user) {
                    index_1.logger.info('User not found');
                    return res.status(400).send('User not registred with this email - ' + email);
                }
                if (user) {
                    const checkedPassword = yield bcrypt_1.default.compare(password, user.password);
                    if (!checkedPassword) {
                        return res.status(400).send('Wrong password!');
                    }
                }
                const { accessToken, refreshToken } = yield tokenService.generateTokens(user.id);
                return res.json({ accessToken, refreshToken });
            }
            catch (error) {
                index_1.logger.error(error);
                return res.status(500).send('Server error.');
            }
        });
    }
    refresh(req, res) {
        try {
            const { refreshToken } = req.body;
            let accessToken;
            if (refreshToken && typeof refreshToken === 'string') {
                jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
                    if (err) {
                        index_1.logger.error(err.message);
                        return res.status(400).send(err.message);
                    }
                    let decodeWithCustomType = decode;
                    accessToken = tokenService.generateToken(decodeWithCustomType.userId, process.env.ACCESS_TOKEN_KEY, process.env.ACCESS_TOKEN_EXPIRESIN);
                    return res.json({ accessToken });
                });
            }
        }
        catch (error) {
            index_1.logger.error(error);
            return res.status(500).send('Server error.');
        }
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                if (authorization) {
                    try {
                        const userToken = yield tokenService.findToken(authorization);
                        if (!userToken)
                            return res.status(200).send("Logged Out Sucessfully");
                        yield tokenService.destroy(userToken);
                    }
                    catch (err) {
                        return res.send(err.name);
                    }
                    res.status(200).send("Logged Out Sucessfully");
                }
                return res.send('logout is work');
            }
            catch (error) {
                index_1.logger.error(error);
                return res.status(500).send('Server error.');
            }
        });
    }
    info(req, res) {
        try {
            const toeken = req.headers.authorization;
            if (toeken && typeof toeken === 'string') {
                jsonwebtoken_1.default.verify(toeken, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
                    if (err) {
                        index_1.logger.error(err);
                        return res.send(err.name);
                    }
                    let decodeWithCustomType = decode;
                    return res.send(`${decodeWithCustomType.userId}`);
                });
            }
        }
        catch (error) {
            index_1.logger.error(error);
            return res.status(500).send('Server error.');
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map