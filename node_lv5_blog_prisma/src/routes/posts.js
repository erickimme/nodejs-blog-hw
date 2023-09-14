import express from 'express';
import authorization from '../middlewares/authorization.js';

import { PostsController } from '../controllers/posts.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

const postsController = new PostsController();

/* 게시물 생성 Logic */
router.post('/', authorization, postsController.createPost);

/** 게시글 조회 API */
router.get('/', postsController.getPosts);

/** 게시글 상세 조회 API */
router.get('/:postId', postsController.getPostById);

// /** 게시글 수정 API */
router.put('/:postId', authorization, postsController.updatePost);

// /** 게시글 삭제 API */
router.delete('/:postId', authorization, postsController.deletePost);

export default router;
