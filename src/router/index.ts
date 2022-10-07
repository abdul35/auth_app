
import express from "express";

import authRouter from './auth.router';
import fileRouter from './file.router';

const router = express.Router();

router.use(authRouter);
router.use(fileRouter);

export default router;