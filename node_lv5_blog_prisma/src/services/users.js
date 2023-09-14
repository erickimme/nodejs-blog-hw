import { UserInfosRepostiory } from '../repositories/users.js';

export class UserInfosService {
  userInfosRepository = new UserInfosRepostiory();

  getUserInfo = async (userId) => {
    const userInfo = await this.userInfosRepository.getUserInfo(userId);

    return userInfo;
  };
}
