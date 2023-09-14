import { prisma } from '../utils/prisma/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginRepository {
  /* 로그인 */
  loginUser = async (nickname) => {
    // 로그인 로직
    const user = await prisma.users.findFirst({ where: { nickname } });
    console.log('user in login repository', user);
    return user;
  };
}
