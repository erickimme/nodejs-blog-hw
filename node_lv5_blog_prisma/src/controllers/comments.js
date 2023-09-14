import { CommentsService } from '../services/comments.js';

export class CommentsController {
  commentsService = new CommentsService();

  /* 댓글 생성 Logic */
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { comment } = req.body;
      const { userId } = req.user;

      if (!postId || !comment) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      } else if (!comment) {
        res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
      } else {
        const createdComment = await this.commentsService.createComment(postId, comment, userId);

        console.log('controller createdComment', createdComment);

        res.status(201).json({ message: '댓글을 작성하였습니다.' });
      }
    } catch (err) {
      next(err);
    }
  };

  /*  게시글 별 댓글 전체 목록 조회 Logic */
  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;

      if (!postId) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      } else {
        const comments = await this.commentsService.getComments(postId);

        console.log('controller get all comments', comments);
        res.status(200).json({ comments: comments });
      }
    } catch (err) {
      next(err);
    }
  };

  /* 댓글 수정 Logic */
  updateComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;
      const { comment } = req.body;

      if (!postId || !commentId || !comment) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      } else if (!comment) {
        res.status(400).json({ message: '댓글 내용을 입력해주세요.' });
      } else {
        const updatedComment = await this.commentsService.updateComment(postId, commentId, comment);

        console.log('controller updatedComment', updatedComment);

        res.status(200).json({ message: '댓글을 수정하였습니다.' });
      }
    } catch (err) {
      next(err);
    }
  };

  /* 댓글 삭제 Logic */
  deleteComment = async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;

      if (!postId || !commentId) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      } else {
        const deletedComment = await this.commentsService.deleteComment(postId, commentId);

        console.log('controller deletedComment', deletedComment);

        res.status(200).json({ message: '댓글을 삭제하였습니다.' });
      }
    } catch (err) {
      next(err);
    }
  };
}
