// routes/comments.router.js
import express from 'express';
import authorization from '../middlewares/authorization.js';
import { CommentsController } from '../controllers/comments.js';

const router = express.Router(); // express.Router()를 이용해 라우터를 생성합니다.

const commentsController = new CommentsController();

/* 댓글 생성 Logic */
router.post('/:postId/comments', authorization, commentsController.createComment);

/*  게시글 별 댓글 전체 목록 조회 Logic */
router.get('/:postId/comments', commentsController.getComments);

/* 댓글 수정 Logic */
router.put('/:postId/comments/:commentId', authorization, commentsController.updateComment);

/* 댓글 삭제 Logic */
router.delete('/:postId/comments/:commentId', authorization, commentsController.deleteComment);

export default router;
