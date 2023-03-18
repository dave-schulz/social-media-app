import {
  createPost,
  findAllPosts,
  findPostsByUser,
  findPostById,
  findAndUpdatePost,
} from './post.service';
import { UserModel } from './../user/user.model';
import { PostModel } from './post.model';
import { PostBody } from './post.schema';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const createPostHandler = async (
  req: Request<object, object, PostBody>,
  res: Response,
) => {
  try {
    const { userId, description, picturePath }: PostBody = req.body;
    const user = await UserModel.findById(userId);
    const newPost = await createPost({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await PostModel.find();

    res.status(StatusCodes.CREATED).json(post);
  } catch (err) {
    res.status(StatusCodes.CONFLICT).json({ message: err.message });
  }
};

export const getFeedPostsHandler = async (
  req: Request<object, object, PostBody>,
  res: Response,
) => {
  try {
    const posts = await findAllPosts();
    res.status(StatusCodes.OK).json(posts);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

export const getUserPostsHandler = async (
  req: Request<object, object, PostBody>,
  res: Response,
) => {
  try {
    const { userId }: PostBody = req.params;
    const posts = await findPostsByUser(userId);
    res.status(StatusCodes.OK).json(posts);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

export const likesPostHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await findPostById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = findAndUpdatePost(
      id,
      {
        likes: post.likes,
      },
      { new: true },
    );
    await res.status(StatusCodes.OK).json(updatedPost);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};
