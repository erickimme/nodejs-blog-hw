import { PostsService } from '../services/posts.js';

export class PostsController {
  postsService = new PostsService();

  /* 게시물 생성 Logic */
  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const { userId } = req.user;

      if (!title || !content) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' });
      }

      const createdPost = await this.postsService.createPost(title, content, userId);

      console.log('controller createdPost', createdPost);
      res.status(201).json({ message: '게시글을 생성하였습니다.' });
    } catch (err) {
      next(err);
    }
  };

  /** 게시글 조회 API */
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.getPosts();

      res.status(200).json({ posts: posts });
    } catch (err) {
      next(err);
    }
  };

  /** 게시글 상세 조회 API */
  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await this.postsService.getPostById(postId);

      res.status(200).json({ post: post });
    } catch (err) {
      next(err);
    }
  };

  // /** 게시글 수정 API */
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      const updatedPost = await this.postsService.updatePost(postId, title, content);

      res.status(200).json({ message: '게시글을 수정하였습니다.' });
    } catch (err) {
      next(err);
    }
  };

  // /** 게시글 삭제 API */
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const deletedPost = await this.postsService.deletePost(postId);

      res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
