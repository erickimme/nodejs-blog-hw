import { LikesRepository } from '../repositories/likes.js';
import { PostsRepository } from '../repositories/posts.js';

export class LikesService {
  postsRepository = new PostsRepository();

  constructor() {
    this.likesRepository = new LikesRepository();
  }

  /* 게시글 좋아요 API */

  getLikeByPostIdAndUserId = async (postId, userId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    const like = await this.likesRepository.getLikeByPostIdAndUserId(postId, userId);

    console.log('service getLikeByPostIdAndUserId', like);
    return like;
  };

  createLike = async (postId, userId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    const createdLike = await this.likesRepository.createLike(postId, userId);

    console.log('service createdLike', createdLike);

    return {
      likeId: createdLike.likeId,
      UserId: userId,
      PostId: postId,
    };
  };

  deleteLike = async (postId, userId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }
    const deletedLike = await this.likesRepository.deleteLike(postId, userId);

    console.log('service deletedLike', deletedLike);
    return deletedLike;
  };

  /* 사용자가 누른 좋아요 게시글 조회 API */
  getLikedPosts = async (userId) => {
    const likedPosts = await this.likesRepository.getLikedPosts(userId);

    console.log('service getLikedPosts', likedPosts);
    return likedPosts;
  };
}
