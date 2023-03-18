import { getModelForClass, prop, PropType } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class Post {
  @prop({ require: true })
  public userId: string;

  @prop({ require: true })
  public firstName: string;

  @prop({ require: true })
  public lastName: string;

  @prop()
  public location: string;

  @prop({ require: true })
  public description: string;

  @prop()
  public picturePath: string;

  @prop()
  public userPicturePath: string;

  @prop()
  public likes: any;

  @prop({ type: () => [String] })
  public comments: string[];
}

export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
  },
});
