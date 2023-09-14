import { CommentsRepository } from '../repositories/comments.js';
import { PostsRepository } from '../repositories/posts.js';
import { parseModelToFlatObject } from '../utils/objectHelper.js';

export class CommentsService {
  commentsRepository = new CommentsRepository();
  postsRepository = new PostsRepository();

  /* 댓글 생성 Logic */
  createComment = async (postId, comment, userId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    const createdComment = await this.commentsRepository.createComment(postId, comment, userId);

    console.log('service createdComment', createdComment);

    return {
      commentId: createdComment.commentId,
      comment: createdComment.comment,
      UserId: userId,
      postId: createdComment.PostId,
    };
  };

  /*  게시글 별 댓글 전체 목록 조회 Logic */
  getComments = async (postId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }
    const comments = await this.commentsRepository.getComments(postId);

    console.log('service get all comments', comments);
    return comments.map((comment) => parseModelToFlatObject(comment));
  };

  /* 댓글 수정 Logic */
  updateComment = async (postId, commentId, comment) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }
    const updatedComment = await this.commentsRepository.updateComment(postId, commentId, comment);

    console.log('service updatedComment', updatedComment);
    return updatedComment;
  };

  /* 댓글 삭제 Logic */
  deleteComment = async (postId, commentId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }
    const deletedComment = await this.commentsRepository.deleteComment(postId, commentId);

    console.log('service deletedComment', deletedComment);
    return deletedComment;
  };
}
