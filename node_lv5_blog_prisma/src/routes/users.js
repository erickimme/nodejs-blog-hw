import express from 'express';
import authorization from '../middlewares/authorization.js';

import { UserInfosController } from '../controllers/users.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

const userInfosController = new UserInfosController();

/* 사용자 정보 조회 API */
router.get('/', authorization, userInfosController.getUserInfo);

// // 사용자 정보 변경 API logic
// // 1. 게시글을 작성하려는 클라이언트가 로그인된 사용자인지 검증합니다.
// // 2. 변경할 사용자 정보 `name`, `age`, `gender`, `profileImage`를 **body**로 전달받습니다.
// // 3. **사용자 정보(UserInofes) 테이블**에서 **사용자의 정보들**을 수정합니다.
// // 4. 사용자의 **변경된 정보 이력**을 **사용자 히스토리(UserHistories)** 테이블에 저장합니다.
// // 5. 사용자 정보 변경 API를 완료합니다
// router.patch('/users', authMiddleware, async (req, res, next) => {
//   // 1. 게시글을 작성하려는 클라이언트가 로그인된 사용자인지 검증합니다.
//   const { userId } = req.user;
//   // 2. 변경할 사용자 정보 `name`, `age`, `gender`, `profileImage`를 **body**로 전달받습니다.
//   const updatedData = req.body;

//   // 3. **사용자 정보(UserInofes) 테이블**에서 **사용자의 정보들**을 수정합니다.
//   const userInfo = await prisma.userInfos.findFirst({
//     where: { UserId: +userId },
//   });

//   await prisma.$transaction(
//     async (tx) => {
//       await tx.userInfos.update({
//         data: {
//           ...updatedData,
//         },
//         where: {
//           UserId: +userId,
//         },
//       });
//       // 4. 사용자의 **변경된 정보 이력**을 **사용자 히스토리(UserHistories)** 테이블에 저장합니다.
//       for (let key in updatedData) {
//         // 변경된 데이터가 있을 때
//         if (userInfo[key] !== updatedData[key]) {
//           await tx.userHistories.create({
//             data: {
//               UserId: +userId,
//               changedField: key,
//               oldValue: String(userInfo[key]),
//               newValue: String(updatedData[key]),
//             },
//           });
//         }
//       }
//     },
//     {
//       isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
//     }
//   );

//   // 5. 사용자 정보 변경 API를 완료합니다
//   return res.status(200).json({ message: '사용자 정보 변경에 성공하였습니다.' });
// });

export default router;
