import { findUserByEmail } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { LoginBody } from './auth.schema';
import { RegisterUserBody } from '../user/user.schema';
import { createUser } from '../user/user.service';
import jwt from 'jsonwebtoken';

export const registerHandler = async (
  req: Request<object, object, RegisterUserBody>,
  res: Response,
) => {
  try {
    const { firstName, lastName, email, password, picturePath } = req.body;

    const newUser = createUser({
      firstName,
      lastName,
      email,
      password,
      picturePath: '/public/assets/' + picturePath,
    });

    const savedUser = await (await newUser).save();
    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const loginHandler = async (
  req: Request<object, object, LoginBody>,
  res: Response,
) => {
  console.log(req.body);
  console.log(process.env.PRIVATE_KEY);

  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, `${process.env.JWT_PRIVATE_KEY}`, {
      algorithm: 'RS256',
    });
    delete user.password;
    res.status(StatusCodes.OK).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
