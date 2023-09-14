import express from 'express';
import { SignupController } from '../controllers/signup.js';
import authLogin from '../middlewares/authLogin.js';

const router = express.Router();

// ? TODO: signupCotnroller로 대문자로 바꿔도 되는지 테스트해보기 */
const signupController = new SignupController();

/* 사용자 회원가입 API Logic */
router.post('/', authLogin, signupController.createUser);

export default router;
