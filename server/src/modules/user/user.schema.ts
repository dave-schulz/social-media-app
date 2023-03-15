import { object, string, TypeOf } from 'zod';

export const userRegisterSchema = {
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    })
      .min(2, 'First name should be longer then 2 characters')
      .max(50, "First name shouldn't be longer then 50 characters"),
    lastName: string({
      required_error: 'First Name is required',
    })
      .min(2, 'First name should be longer then 2 characters')
      .max(50, "First name shouldn't be longer then 50 characters"),
    email: string({
      required_error: 'Email is required',
    })
      .email()
      .max(50, "Email shouldn't be longer then 50 characters"),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
    passwordConfirmation: string({
      required_error: 'Password is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
};

export type RegisterUserBody = TypeOf<typeof userRegisterSchema.body>;
