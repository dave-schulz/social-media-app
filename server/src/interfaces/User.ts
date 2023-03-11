import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath: string;
  friends: IFriends[];
  occupation: string;
  location: string;
  viewedProfile: number;
  impressions: number;
}

export interface IFriends {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  picturePath: string;
  occupation: string;
  location: string;
}
