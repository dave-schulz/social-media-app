import { string, object, TypeOf } from 'zod';

export const UserLoginSchema = {
  body: object({
    email: string({
      required_error: 'Email must be provided',
    }).email('This is not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }),
  }),
};

export type LoginBody = TypeOf<typeof UserLoginSchema.body>;
