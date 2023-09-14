import { SignupService } from '../services/signup.js';
import joi from 'joi';

/* Joi유효성 검사 */
// - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
// - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
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

export class SignupController {
  /** class 가져오기 */
  signupService = new SignupService();

  createUser = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;

      // req.body에 nickname, password, confirm이 없는 경우
      if (!nickname || !password || !confirm) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      }

      // password != confirm
      if (password != confirm) {
        res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
      }

      // 닉네임, 패스워드 validate using joi
      const result = await postUserSchema.validateAsync(req.body);
      if (!result) {
        return res.status(400).json({ message: '검증할 데이터가 존재하지 않습니다.' });
      }

      const createdUser = await this.signupService.createUser(nickname, password);
      // res.status(201).json({ data: createdUser });
      console.log('controller createdUser', createdUser);
      return res.status(201).json({ message: '회원 가입에 성공하였습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
