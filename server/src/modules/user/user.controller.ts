import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import { UserModel } from './user.model';

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

export const getUserFriendsHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => UserModel.findById(id)),
    );
    const formattedFriends = friends.map(({ ...friendsData }) => {
      return { ...friendsData };
    });
    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

export const addRemoveFriendHandler = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = await UserModel.findById(id);
    const friend = await UserModel.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => UserModel.findById(id)),
    );
    const formattedFriends = friends.map(({ ...friendsData }) => {
      return { ...friendsData };
    });

    res.status(StatusCodes.OK).json(formattedFriends);
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};
