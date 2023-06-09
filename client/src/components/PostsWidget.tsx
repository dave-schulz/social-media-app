import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/state';
import PostWidget from '@/components/PostWidget';
import { IPost, IState } from '@/types/interfaces';

const PostsWidget: FC<IPost> = (props): ReactElement => {
  const dispatch = useDispatch();
  const posts = useSelector((state: IPost) => state.posts);
  const token = useSelector((state: IState) => state.token);

  const { userId, isProfile = false } = props;

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/api/posts', {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token },
    });

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/api/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ),
      )}
    </>
  );
};

export default PostsWidget;
