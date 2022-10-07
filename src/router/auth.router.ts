import express, { Request, Response } from "express";
import { AuthController } from '@controllers/auth/auth.controller';
const router = express.Router();
const authController = new AuthController();

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.get('/logout', authController.logout);

router.get('/info', authController.info);

router.post('/signin/new_token', authController.refresh);

export default router;