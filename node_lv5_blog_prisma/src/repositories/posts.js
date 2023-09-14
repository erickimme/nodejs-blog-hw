import { prisma } from '../utils/prisma/index.js';

export class PostsRepository {
  /* 게시글 생성 */
  createPost = async (title, content, userId) => {
    const createdPost = await prisma.posts.create({
      data: {
        title,
        content,
        UserId: userId,
      },
    });

    return createdPost;
  };

  /* 전체 게시글 조회 */
  getPosts = async () => {
    const posts = await prisma.posts.findMany({
      select: {
        postId: true,
        UserId: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Likes: true,
            Comments: true,
          },
        },
      },
    });

    posts.sort((a, b) => {
      return b._count.Likes - a._count.Likes;
    });
    return posts;
  };

  /* 게시글 상세 조회 */
  getPostById = async (postId) => {
    const post = await prisma.posts.findUnique({
      where: {
        postId,
      },
      select: {
        postId: true,
        UserId: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return post;
  };

  /* 게시글 수정 */
  updatePost = async (postId, title, content) => {
    const updatedPost = await prisma.posts.update({
      where: {
        postId,
      },
      data: {
        title,
        content,
      },
    });

    return updatedPost;
  };

  /* 게시글 삭제 */
  deletePost = async (postId) => {
    const deletedPost = await prisma.posts.delete({
      where: {
        postId,
      },
    });

    return deletedPost;
  };
}
