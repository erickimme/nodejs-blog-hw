import { LikesService } from '../services/likes.js';

export class LikesController {
  likesService = new LikesService();

  /* 게시글 좋아요 API */
  likePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = req.user;

      if (!postId) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      } else {
        const like = await this.likesService.getLikeByPostIdAndUserId(postId, userId);
        // like 존재한다면, like 삭제
        if (like) {
          await this.likesService.deleteLike(like.likeId);
          res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
        } else {
          // like가 없다면, like 생성
          await this.likesService.createLike(postId, userId);
          res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다.' });
        }
      }
    } catch (err) {
      next(err);
    }
  };

  /* 사용자가 누른 좋아요 게시글 조회 API */
  getLikedPosts = async (req, res, next) => {
    try {
      const { userId } = req.user;

      const likedPosts = await this.likesService.getLikedPosts(userId);

      if (likedPosts.length === 0) {
        res.status(404).json({ message: '좋아요한 게시글이 없습니다.' });
      }
      res.status(200).json({ posts: likedPosts });
    } catch (err) {
      next(err);
    }
  };
}
