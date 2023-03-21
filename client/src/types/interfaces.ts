export interface IUser {
  _id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  picturePath?: string;
  location?: string;
  occupation?: string;
  picture?: string | any;
  friends?: Array<object> | any;
  viewedProfile?: string;
  impressions?: string;
  friendId?: string | null;
}

export interface IPost {
  id?: string;
  _id?: string;
  postId?: string;
  postUserId?: string;
  userId?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  picturePath?: string;
  userPicturePath?: string;
  image?: string | any;
  description?: string;
  location?: string;
  isProfile?: boolean;
  user?: any;
  posts?: Array<any>;
  likes?: number | any;
  comments?: any;
}

export interface IFriend {
  _id?: string;
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}

export interface IState {
  mode: string;
  user: IUser | any;
  token: string | null;
  posts: Array<any>;
}

export interface IMyPostWidget {
  picturePath: string;
  onChange?: (e: React.ChangeEvent) => void;
}

export interface IUserProfile {
  image: string;
  size?: string;
}
