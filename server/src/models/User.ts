import mongoose, { Schema, model, connect, Types, Document } from 'mongoose';

import { IUser } from '../interfaces/User';
import { IFriends } from '../interfaces/Friends';

export interface IUserModal extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserModal>(
  {
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
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUserModal>('User', UserSchema);
export default User;
