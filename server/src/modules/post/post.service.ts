import { PostModel, Post } from './post.model';

export const createPost = async (post: Post) => {
  return await PostModel.create(post);
};

export const findAllPosts = async () => {
  const posts = await PostModel.find();
  return posts;
};

export const findPostsByUser = async (user: Post['userId']) => {
  return await PostModel.findOne({ user });
};

export const findPostById = async (id: string) => {
  return await PostModel.findById(id);
};

export const findAndUpdatePost = async (
  id: string,
  likes: Post['likes'],
  newArr: any,
) => {
  return await PostModel.findByIdAndUpdate({ id, likes });
};
