import { getModelForClass, prop, pre, Ref } from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = bcrypt.genSaltSync();
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    return next();
  }
})
export class User {
  @prop({ required: true, min: 2, max: 50 })
  public firstName: string;

  @prop({ required: true, min: 2, max: 50 })
  public lastName: string;

  @prop({ required: true, unique: true, max: 50 })
  public email: string;

  @prop({ required: true, min: 5 })
  public password: string;

  @prop({ default: '' })
  public picturePath?: string;

  @prop()
  public friends?: any;

  @prop()
  public location?: string;

  @prop()
  public occupation?: string;

  @prop()
  public viewedProfile?: number;

  @prop()
  public impressions?: number;

  // public async comparePassword(password: string): Promise<boolean> {
  //   return await bcrypt.compare(this.password, password);
  // }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
