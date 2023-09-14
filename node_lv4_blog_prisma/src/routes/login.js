import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';

/** 사용자 로그인 API Logic */
// - 닉네임, 비밀번호를 **request**에서 전달받기
// - 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요."라는 에러 메세지를 **response**에 포함하기
// - 로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
// request
// {  "nickname": "Developer",  "password": "1234"}

const router = express.Router();

const loginSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});

router.post('/', async (req, res, next) => {
  try {
    const { nickname, password } = await loginSchema.validateAsync(req.body);

    const user = await prisma.users.findFirst({ where: { nickname } });
    console.log(user);
    if (!user) {
      res.status(412).json({ errorMessage: '닉네임 또는 패스워드를 확인해주세요.' });
    }
    // 입력받은 사용자의 닉네임, 비밀번호와 데이터베이스에 저장된 닉네임, 비밀번호를 비교
    else if (!(await bcrypt.compare(password, user.password)) || nickname != user.nickname) {
      return res.status(400).json({ errorMessage: '로그인에 실패하였습니다.' });
    }

    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // expires의 시간을 현재 시간의 60분 후로 설정

    //로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);

    // authorization 쿠키 전달
    res.cookie('authorization', `Bearer ${token}`, { expires: expires });

    return res.status(200).json({ tokens: `${token}` });
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
    next(error);
  }
});

export default router;
