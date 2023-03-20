import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { IUserProfile } from '@/types/interfaces';

const UserImage: FC<IUserProfile> = (props): ReactElement => {
  const { size = '60px', image } = props;

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        src={`http://localhost:3001/assets/${image}`}
        alt="user"
      />
    </Box>
  );
};

export default UserImage;
