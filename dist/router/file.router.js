"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const file_controller_1 = require("../controllers/file/file.controller");
const router = express_1.default.Router();
const fileController = new file_controller_1.FileController();
router.post('/file/upload', auth_middleware_1.authMiddleware, fileController.upload);
router.get('/file/list', auth_middleware_1.authMiddleware, fileController.list);
router.get('/file/download/:id', auth_middleware_1.authMiddleware, fileController.download);
router.get('/file/:id', auth_middleware_1.authMiddleware, fileController.getFile);
router.put('/file/update/:id', auth_middleware_1.authMiddleware, fileController.update);
router.delete('/file/delete/:id', auth_middleware_1.authMiddleware, fileController.delete);
exports.default = router;
//# sourceMappingURL=file.router.js.map