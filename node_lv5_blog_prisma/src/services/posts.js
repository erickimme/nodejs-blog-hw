import { PostsRepository } from '../repositories/posts.js';
import { parseModelToFlatObject } from '../utils/objectHelper.js';

export class PostsService {
  postsRepository = new PostsRepository();

  createPost = async (title, content, userId) => {
    const createdPost = await this.postsRepository.createPost(title, content, userId);

    return {
      title: createdPost.title,
      content: createdPost.content,
      userId: createdPost.UserId,
    };
  };

  getPosts = async () => {
    const posts = await this.postsRepository.getPosts();

    return posts.map((post) => parseModelToFlatObject(post));
  };

  getPostById = async (postId) => {
    const post = await this.postsRepository.getPostById(postId);
    if (!post) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    return parseModelToFlatObject(post);
  };

  updatePost = async (postId, title, content) => {
    const updatedPost = await this.postsRepository.updatePost(postId, title, content);

    return updatedPost;
  };

  deletePost = async (postId) => {
    const deletedPost = await this.postsRepository.deletePost(postId);

    return deletedPost;
  };
}
