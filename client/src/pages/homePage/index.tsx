import React, { FC, ReactElement } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import NavBar from '@/pages/navbar';
import { useSelector } from 'react-redux';
import UserWidget from '@/components/UserWidget';
import MyPostWidget from '@/components/MyPostWidget';
import PostsWidget from '@/components/PostsWidget';
import FriendListWidget from '@/components/FriendListWidget';

const HomePage: FC = (): ReactElement => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { _id, picturePath } = useSelector((state: any) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? 'flex' : 'column'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
