import { string, object, TypeOf } from 'zod';

export const UserLoginSchema = {
  body: object({
    email: string({
      required_error: 'Email must be provided',
    }).email('This is not a valid email address'),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
  }),
};

export type LoginBody = TypeOf<typeof UserLoginSchema.body>;
