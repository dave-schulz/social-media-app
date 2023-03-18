import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import NavBar from '@/pages/navbar';

const HomePage: FC = (): ReactElement => {
  return (
    <Box>
      <NavBar />
    </Box>
  );
};

export default HomePage;
