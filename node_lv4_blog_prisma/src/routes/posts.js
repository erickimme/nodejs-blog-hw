import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import authorization from '../middlewares/authorization.js';
import { parseModelToFlatObject } from '../utils/objectHelper.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

/* 게시물 생성 Logic */
router.post('/', authorization, async (req, res, next) => {
  const { userId } = req.user;
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  } else {
    try {
      await prisma.posts.create({
        data: {
          UserId: userId,
          title,
          content,
        },
      });
      res.status(201).json({ message: '게시글을 생성하였습니다.' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

/*  전체 게시물 목록 조회 Logic */
router.get('/', async (req, res, next) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        postId: true,
        UserId: true,
        User: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Comment: true,
            Like: true,
          },
        },
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 내림차순으로 정렬
    posts.sort((a, b) => {
      return b._count.Like - a._count.Like;
    });

    res.status(200).json({ posts: posts.map((post) => parseModelToFlatObject(post)) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
/* 게시물 상세 조회 Logic */
router.get('/:postId', authorization, async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  } else {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          postId,
        },
        select: {
          postId: true,
          UserId: true,
          User: {
            select: {
              nickname: true,
            },
          },
          title: true,
          content: true,
          Likes: {
            select: {
              likeId: true,
            },
          },
          Comments: {
            select: {
              commentId: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!post) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
      } else {
        res.status(200).json({ post: parseModelToFlatObject(post) });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

/* 상세 게시물 수정 Logic */
router.put('/:postId', authorization, async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!postId || !title || !content) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  } else {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          postId,
        },
      });
      if (!post) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
      } else {
        await prisma.posts.update({
          where: {
            postId,
          },
          data: {
            title,
            content,
          },
        });
        res.status(200).json({ message: '게시글을 수정하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

/* 게시물 삭제 Logic */
router.delete('/:postId', authorization, async (req, res, next) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
  } else {
    try {
      const post = await prisma.posts.findUnique({
        where: {
          postId,
        },
      });
      if (!post) {
        res.status(404).json({ message: '게시글 조회에 실패하였습니다.' });
      } else {
        await prisma.posts.delete({
          where: {
            postId,
          },
        });
        res.status(200).json({ message: '게시글을 삭제하였습니다.' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
});

export default router;
