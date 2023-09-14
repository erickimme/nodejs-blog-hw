import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';

export class SignupRepository {
  /* 회원가입 */
  createUser = async (nickname, password) => {
    // 회원가입 로직
    const isExistUser = await prisma.users.findFirst({
      where: { nickname },
    });
    if (isExistUser) {
      throw new Error('중복된 닉네임입니다.');
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
      return createdUser;
    }
  };
}
