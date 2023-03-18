import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  firstName: string;
  lastName: string;
  friends: Array<object>;
}

export interface IPost {
  _id: string;
}

export interface IState {
  mode: string;
  user: IUser;
  token: string | null;
  posts: Array<IPost>;
}

const initialState: IState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action: PayloadAction<{ friends: Array<object> }>) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log('USer friends not available');
      }
    },
    setPosts: (state, action: PayloadAction<{ posts: Array<IPost> }>) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action: PayloadAction<{ post: IPost; id: string }>) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
