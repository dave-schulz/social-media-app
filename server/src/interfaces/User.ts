import { Types } from 'mongoose';

import { IFriends } from './Friends';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: IFriends[];
  occupation: string;
  location: string;
  viewedProfile?: number;
  impressions?: number;
}
