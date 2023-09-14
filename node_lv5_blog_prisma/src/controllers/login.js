import { LoginService } from '../services/login.js';
import joi from 'joi';

const loginSchema = joi.object({
  nickname: joi.string().required(),
  password: joi.string().required(),
});

export class LoginController {
  loginService = new LoginService();

  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      // req.body에 nickname, password가 없는 경우
      if (!nickname || !password) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      }

      // 닉네임, 패스워드 validate using joi
      const result = await loginSchema.validateAsync(req.body);
      if (!result) {
        return res.status(400).json({ errorMessage: '검증할 데이터가 존재하지 않습니다.' });
      }

      const token = await this.loginService.loginUser(nickname, password);
      console.log('token in login controller', token);
      // expires의 시간을 현재 시간의 60분 후로 설정
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 60);

      // authorization 쿠키 전달
      res.cookie('authorization', `Bearer ${token}`, { expires: expires });
      return res.status(200).json({ tokens: token });
    } catch (err) {
      next(err);
    }
  };
}
