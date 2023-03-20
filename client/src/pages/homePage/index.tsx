import React, { FC, ReactElement } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import NavBar from '@/pages/navbar';
import { useSelector } from 'react-redux';
import UserWidget from '@/components/UserWidget';

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
        <Box>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
