import { prisma } from '../utils/prisma/index.js';

export class CommentsRepository {
  /* 댓글 생성 Logic */
  createComment = async (postId, comment, userId) => {
    const createdComment = await prisma.comments.create({
      data: {
        PostId: postId,
        UserId: userId,
        comment,
      },
    });

    return createdComment;
  };

  /* 게시글 별 댓글 전체 목록 조회 Logic */
  getComments = async (postId) => {
    const comments = await prisma.comments.findMany({
      where: {
        PostId: postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        commentId: true,
        UserId: true,
        PostId: true,
        User: {
          select: {
            nickname: true,
          },
        },
        comment: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return comments;
  };

  /* 댓글 수정 Logic */
  updateComment = async (postId, commentId, comment) => {
    const updatedComment = await prisma.comments.update({
      where: {
        commentId,
      },
      data: {
        comment,
      },
    });

    return updatedComment;
  };

  /* 댓글 삭제 Logic */
  deleteComment = async (postId, commentId) => {
    const deletedComment = await prisma.comments.delete({
      where: {
        commentId,
        PostId: postId,
      },
    });

    return deletedComment;
  };
}

// /* 댓글 생성 Logic */
// router.post('/:postId/comments', authorization, async (req, res, next) => {
//   const { postId } = req.params;
//   const { comment } = req.body;

//   if (!postId || !comment) {
//     res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
//   } else if (!comment) {
//     res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
//   } else {
//     try {
//       const createdComment = await prisma.comments.create({
//         data: {
//           PostId: postId,
//           UserId: req.user.userId,
//           comment,
//         },
//       });
//       res.status(201).json({ message: '댓글을 작성하였습니다.' });
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// });

// /*  게시글 별 댓글 전체 목록 조회 Logic */
// router.get('/:postId/comments', async (req, res, next) => {
//   const { postId } = req.params;
//   if (!postId) {
//     res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
//   } else {
//     try {
//       const comments = await prisma.comments.findMany({
//         where: {
//           PostId: postId,
//         },
//         orderBy: {
//           createdAt: 'desc',
//         },
//         select: {
//           commentId: true,
//           UserId: true,
//           PostId: true,
//           User: {
//             select: {
//               nickname: true,
//             },
//           },
//           comment: true,
//           createdAt: true,
//           updatedAt: true,
//         },
//       });
//       if (comments.length === 0) {
//         res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
//       } else {
//         res
//           .status(200)
//           .json({ comments: comments.map((comment) => parseModelToFlatObject(comment)) });
//       }
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// });

// /* 댓글 수정 Logic */
// router.put('/:postId/comments/:commentId', authorization, async (req, res, next) => {
//   const { postId, commentId } = req.params;
//   const { comment } = req.body;

//   if (!postId || !commentId || !comment) {
//     res.status(400).json({ message: '데이터 형식이 올바르지 않습니 || ' });
//   } else if (!comment) {
//     res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
//   } else {
//     try {
//       const targetComment = await prisma.comments.findUnique({
//         where: {
//           commentId: commentId,
//         },
//       });
//       if (!targetComment) {
//         res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
//       } else {
//         const updatedComment = await prisma.comments.update({
//           where: {
//             commentId,
//           },
//           data: {
//             comment,
//           },
//         });
//         res.status(200).json({ message: '댓글을 수정하였습니다.' });
//       }
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// });

// /* 댓글 삭제 Logic */
// router.delete('/:postId/comments/:commentId', authorization, async (req, res, next) => {
//   const { postId, commentId } = req.params;

//   if ((!postId, !commentId)) {
//     res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
//   } else {
//     try {
//       const comment = await prisma.comments.findUnique({
//         where: {
//           commentId,
//         },
//       });
//       if (!comment) {
//         res.status(404).json({ message: '댓글 조회에 실패하였습니다.' });
//       } else {
//         await prisma.comments.delete({
//           where: {
//             commentId,
//             PostId: postId,
//           },
//         });
//         res.status(200).json({ message: '댓글을 삭제하였습니다.' });
//       }
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// });
