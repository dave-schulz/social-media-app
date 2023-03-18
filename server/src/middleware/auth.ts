import { StatusCodes } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.header('Authorization');

    if (!token) return res.status(StatusCodes.FORBIDDEN).send('Access Denied');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`);

    res.locals.user = verified;

    next();
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
