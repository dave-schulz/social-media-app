import { Request, Response } from 'express';
import User from '../models/User';

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location }) => {
        return { _id, firstName, lastName, occupation, location };
      },
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId }: any = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id)),
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location }) => {
        return { _id, firstName, lastName, occupation, location };
      },
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
