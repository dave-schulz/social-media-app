import { Schema, model, connect, Types } from 'mongoose';

import { IUser, IFriends } from '../interfaces/User';

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  picturePath: {
    type: String,
    required: false,
    default: '',
  },
  friends: {
    type: Array<IFriends>,
    default: [],
  },
  location: String,
  occupation: String,
  viewedProfile: Number,
  impressions: Number,
});
