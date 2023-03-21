export interface IUser {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
  occupation?: string;
  picture?: string | any;
  friends?: Array<object>;
  viewedProfile?: string;
  impressions?: string;
}

export interface IMyPost {
  picturePath: string;
  onChange?: (e: React.ChangeEvent) => void;
}

export interface IUserProfile {
  image: string;
  size?: string;
}

export interface IPost {
  _id?: string;
  picturePath?: string;
  image?: string | any;
  user?: any;
  posts?: Array<IPost>;
}

export interface IState {
  mode: string;
  user: IUser | null;
  token: string | null;
  posts: Array<IPost>;
}
