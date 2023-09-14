import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authorization from '../middlewares/authorization.js';
import { parseModelToFlatObject } from '../utils/objectHelper.js';

const router = express.Router();

/** 게시글 좋아요 API 
*1. 게시글 좋아요 API
    - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 좋아요 가능
    - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 좋아요 취소 할 수 있게 하기
    - 게시글 목록 조회시 글의 좋아요 갯수도 같이 표출하기
*/
router.put('/:postId/like', authorization, async (req, res, next) => {
  const { postId } = req.params;
  const { userId } = req.user;

  if (!postId) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  } else {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          postId: postId,
        },
      });
      if (!post) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
      } else {
        const like = await prisma.likes.findFirst({
          where: {
            PostId: postId,
            UserId: userId,
          },
        });
        // like 존재한다면, like 삭제
        if (like) {
          await prisma.likes.delete({
            where: {
              likeId: like.likeId,
            },
          });
          res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
        } else {
          // like가 없다면, like 생성
          await prisma.likes.create({
            data: {
              PostId: postId,
              UserId: userId,
            },
          });
          res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다.' });
        }
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

/** 
2. 사용자가 누른 좋아요 게시글 조회 API
    - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 좋아요 게시글 조회 가능
    - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기
    - 제목, 작성자명(nickname), 작성 날짜, 좋아요 갯수를 조회하기
    - 제일 좋아요가 많은 게시글을 맨 위에 정렬하기 (내림차순)
*
*
*/
router.get('/like', authorization, async (req, res, next) => {
  const { userId } = req.user;

  const likedPosts = await prisma.likes.findMany({
    where: {
      UserId: userId,
    },
    select: {
      Post: {
        select: {
          postId: true,
          User: {
            select: {
              userId: true,
              nickname: true,
            },
          },
          postId: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              Like: true,
            },
          },
        },
      },
    },
  });

  // likes 내림차순으로 정렬
  likedPosts.sort((a, b) => {
    return b.Post._count.Like - a.Post._count.Like;
  });

  if (likedPosts.length === 0) {
    res.status(404).json({ message: '좋아요한 게시글이 없습니다.' });
  }
  res.status(200).json({ posts: likedPosts.map((post) => parseModelToFlatObject(post.Post)) });
});
export default router;
