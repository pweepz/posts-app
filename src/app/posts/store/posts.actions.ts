import { createAction, props } from '@ngrx/store';

import { Post, Comment, ApiUrlResponse } from './models';


export const getApiEndpoints = createAction(
  '[API] Get api endpoint'
);

export const setApiEndpoints = createAction(
  '[API] Set api endpoint',
  props<{ apiUrls: ApiUrlResponse }>()
);

export const getPosts = createAction(
  '[Posts] Get Post Items',
  props<{ url: string }>()
);

export const setPosts = createAction(
  '[Posts] Set Post Items',
  props<{ posts: Post[] }>(),
);

export const getPost = createAction(
  '[Posts] Get Post Item',
  props<{ url: string, id: number }>()
);

export const setPost = createAction(
  '[Posts] Set Post Item',
  props<{ post: Post }>()
);

export const getComments = createAction(
  '[Posts] Get Comment Items',
  props<{ url: string }>()
);

export const setComments = createAction(
  '[Posts] Set Comment Items',
  props<{ comments: Comment[] }>()
);

export const requestFailed = createAction(
  '[Posts] Request Failed',
  props<{ error: any }>()
);
