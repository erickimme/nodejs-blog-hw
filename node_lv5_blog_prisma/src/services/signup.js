import { SignupRepository } from '../repositories/signup.js';

export class SignupService {
  signupRepository = new SignupRepository();

  createUser = async (nickname, password) => {
    const signupUser = await this.signupRepository.createUser(nickname, password);

    return {
      nickname: signupUser.nickname,
      password: signupUser.password,
    };
  };
}
