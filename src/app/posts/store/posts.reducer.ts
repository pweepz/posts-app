import { Action, createReducer, on } from '@ngrx/store';

import * as fromPosts from './posts.actions';
import { Post, Comment, ApiUrlResponse } from './models';
export const postsFeatureKey = 'posts';

export interface PostsState {
  apiUrls: ApiUrlResponse;
  posts: Post[];
  post: Post;
  comments: Comment[];
  isLoading: boolean;
}

const initialState: PostsState = {
  apiUrls: null,
  posts: [],
  post: null,
  comments: [],
  isLoading: false,
};

export const postsReducer = createReducer(
  initialState,
  on(
    fromPosts.getPosts,
    fromPosts.getPost,
    fromPosts.getApiEndpoints,
    (state: PostsState) => ({
      ...state,
      isLoading: true,
    })),
  on(fromPosts.setPosts, (state: PostsState, { posts }) => ({
    ...state,
    posts,
    isLoading: false,
  })),
  on(fromPosts.setPost, (state: PostsState, { post }) => ({
    ...state,
    post,
    isLoading: false,
  })),
  on(fromPosts.setComments, (state: PostsState, { comments }) => ({
    ...state,
    comments,
    isLoading: false,
  })),
  on(fromPosts.setApiEndpoints, (state: PostsState, { apiUrls }) => ({
    ...state,
    apiUrls,
    isLoading: false,
  })),
  on(fromPosts.requestFailed, (state: PostsState) => ({
    ...state,
    isLoading: false,
  })),
);

export function reducer(state: PostsState | undefined, action: Action) {
  return postsReducer(state, action);
}
