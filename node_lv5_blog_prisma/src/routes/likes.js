import express from 'express';
import authorization from '../middlewares/authorization.js';

import { LikesController } from '../controllers/likes.js';

const router = express.Router();

const likesController = new LikesController();

/* 게시글 좋아요 API */
router.put('/:postId/like', authorization, likesController.likePost);

/* 사용자가 누른 좋아요 게시글 조회 API */
router.get('/like', authorization, likesController.getLikedPosts);

export default router;
