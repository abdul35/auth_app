import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { FileController } from '../controllers/file/file.controller';
const router = express.Router();
const fileController = new FileController();


router.post('/file/upload', authMiddleware, fileController.upload);

router.get('/file/list', authMiddleware, fileController.list);

router.get('/file/download/:id', authMiddleware, fileController.download);

router.get('/file/:id', authMiddleware, fileController.getFile);

router.put('/file/update/:id', authMiddleware, fileController.update);

router.delete('/file/delete/:id', authMiddleware, fileController.delete);

export default router;