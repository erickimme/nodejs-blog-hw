import express from 'express';
import bcrypt from 'bcrypt';
import joi from 'joi';
import { prisma } from '../utils/prisma/index.js'; // 객체구조분해할당
import authLogin from '../middlewares/authLogin.js'; // 로그인 검증

const router = express.Router();

/* 사용자 회원가입 API Logic */
/* Joi유효성 검사 */
// - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
// - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
// const re_nickname = /^[a-zA-Z0-9]{3,10}$/;
// const re_password = /^[a-zA-Z0-9]{4,30}$/;
const nickname_pattern = /^[a-z|A-Z|0-9]+$/;
const postUserSchema = joi.object({
  nickname: joi.string().min(3).pattern(new RegExp(nickname_pattern)).required().messages({
    'string.pattern.base': '닉네임은 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성되어야합니다.',
    'string.min': '닉네임은 최소 3자 이상이여야합니다.',
  }),
  password: joi
    .string()
    .min(4)
    .custom((value, helpers) => {
      if (value.includes(helpers.state.ancestors[0].nickname)) {
        return helpers.error('password.nicknameInPassword');
      }
      return value;
    })
    .required()
    .messages({
      'password.nicknameInPassword': '비밀번호에 닉네임이 포함되어 있습니다.',
      'string.min': '비밀번호는 최소 4자 이상이여야합니다.',
    }),
  confirm: joi.string().valid(joi.ref('password')).required().messages({
    'any.only': '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
  }),
});

router.post('/', authLogin, async (req, res, next) => {
  try {
    const { nickname, password, confirm } = req.body;

    // req.body에 nickname, password, confirm이 없는 경우
    if (!nickname || !password || !confirm) {
      res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    // 닉네임, 패스워드 validate using joi
    const result = await postUserSchema.validateAsync(req.body);
    if (!result) {
      return res.status(400).json({ errorMessage: '검증할 데이터가 존재하지 않습니다.' });
    }

    // 회원가입 로직
    const isExistUser = await prisma.users.findFirst({
      where: { nickname },
    });
    if (isExistUser) {
      return res.status(409).json({ message: '중복된 닉네임입니다.' });
    } else {
      // bcrypt를 이용한 암호화
      const hashedPassword = await bcrypt.hash(password, 10);
      // 회원가입 성공 시 Users 테이블에 사용자 생성
      const createdUser = await prisma.users.create({
        data: {
          nickname,
          password: hashedPassword,
        },
      });
      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
