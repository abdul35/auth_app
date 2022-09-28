import express, { Request, Response } from "express";
import { FileController } from '../controllers/file/file.controller';
const router = express.Router();
const fileController = new FileController();


router.post('/upload', fileController.upload);

router.get('/list', fileController.list);

router.get('/download/:id', fileController.download);

router.put('/update/:id', fileController.update);

router.delete('/delete/:id', fileController.delete);

export default router;