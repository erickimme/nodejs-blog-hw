import { LoginRepository } from '../repositories/login.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginService {
  loginRepository = new LoginRepository();

  loginUser = async (nickname, password) => {
    const user = await this.loginRepository.loginUser(nickname, password);
    console.log('login service loginUser', user);

    if (!user) {
      throw new Error('닉네임 또는 패스워드를 확인해주세요.');
    }
    // 입력받은 사용자의 닉네임, 비밀번호와 데이터베이스에 저장된 닉네임, 비밀번호를 비교
    else if (!(await bcrypt.compare(password, user.password)) || nickname != user.nickname) {
      throw new Error('로그인에 실패하였습니다.');
    }
    //로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);
    console.log('token in login service', token);

    return token;
  };
}
