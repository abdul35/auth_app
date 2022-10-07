"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("@controllers/auth/auth.controller");
const router = express_1.default.Router();
const authController = new auth_controller_1.AuthController();
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.get('/info', authController.info);
router.post('/signin/new_token', authController.refresh);
exports.default = router;
//# sourceMappingURL=auth.router.js.map