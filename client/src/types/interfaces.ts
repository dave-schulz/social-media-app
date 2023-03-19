export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  location?: string;
  occupation?: string;
  picture?: string | any;
  friends?: Array<object>;
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
