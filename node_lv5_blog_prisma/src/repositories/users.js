import { prisma } from '../utils/prisma/index.js';

export class UserInfosRepostiory {
  /* 사용자 정보 조회 */
  getUserInfo = async (userId) => {
    const userInfo = await prisma.users.findUnique({
      where: {
        userId,
      },
      select: {
        userId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        UserInfos: {
          select: {
            name: true,
            age: true,
            gender: true,
            profileImage: true,
          },
        },
      },
    });

    console.log('repo userInfo: ', userInfo);
    return userInfo;
  };
}

// /*  **[게시판 프로젝트] 사용자 정보 조회 API 비즈니스 로직 */
// // 1. 클라이언트가 **로그인된 사용자인지 검증**합니다.
// // 2. 사용자를 조회할 때, 1:1 관계를 맺고 있는 **Users**와 **UserInfos** 테이블을 조회합니다.
// // 3. 조회한 사용자의 상세한 정보를 클라이언트에게 반환합니다.
// router.get('/users', authMiddleware, async (req, res, next) => {
//   const { userId } = req.user;

//   const user = await prisma.users.findFirst({
//     where: { userId: +userId },
//     // 특정 컬럼만 조회하는 퍼러미터
//     select: {
//       userId: true,
//       email: true,
//       createdAt: true,
//       updatedAt: true,
//       UserInfos: {
//         select: {
//           name: true,
//           age: true,
//           gender: true,
//           profileImage: true,
//         },
//       },
//     },
//   });

//   return res.status(200).json({ data: user });
// });
