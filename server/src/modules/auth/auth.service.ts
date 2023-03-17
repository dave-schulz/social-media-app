import { User, UserModel } from '../user/user.model';

export const findUserByEmail = async (email: User['email']) => {
  return await UserModel.findOne({ email });
};
