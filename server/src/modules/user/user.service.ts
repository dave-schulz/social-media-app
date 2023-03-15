import { UserModel, User } from './user.model';

export const createUser = (user: User) => {
  return UserModel.create(user);
};
