import { UserInfosService } from '../services/users.js';

export class UserInfosController {
  userInfosService = new UserInfosService();

  /* 사용자 정보 조회 API */
  getUserInfo = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userInfo = await this.userInfosService.getUserInfo(userId);

      res.status(200).json({ data: userInfo });
    } catch (err) {
      next(err);
    }
  };
}
