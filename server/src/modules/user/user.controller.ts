import { createUser } from './../user/user.service';
import { RegisterUserBody } from './../user/user.schema';
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const registerHandler = async (
  req: Request<object, object, RegisterUserBody>,
  res: Response,
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = createUser({
      firstName,
      lastName,
      email,
      password,
    });

    const savedUser = await (await newUser).save();
    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
