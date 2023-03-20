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

export interface IUserProfile {
  image: string;
  size?: string;
}

export interface IPost {
  _id: string;
}

export interface IState {
  mode: string;
  user: IUser | null;
  token: string | null;
  posts: Array<IPost>;
}
