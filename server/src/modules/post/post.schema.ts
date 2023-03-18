import { object, string, TypeOf } from 'zod';

export const PostSchema = {
  body: object({
    userId: string({
      required_error: 'User ID must be provided',
    }),
    description: string({
      required_error: 'Description must be provided',
    })
      .min(6, 'Description must be at least 20 characters')
      .max(64, 'password must not be longer than 528 charcters'),
    picturePath: string({
      required_error: 'Picture must be provided',
    }),
  }),
};

export type PostBody = TypeOf<typeof PostSchema.body>;
