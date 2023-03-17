import { UserModel, User } from './user.model';

export const createUser = async (user: Omit<User, 'comparePassword'>) => {
  return await UserModel.create(user);
};
