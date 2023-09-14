import express from 'express';
import { LoginController } from '../controllers/login.js';

const router = express.Router();

/* 사용자 로그인 API Logic */
const loginController = new LoginController();
router.post('/', loginController.loginUser);

export default router;
