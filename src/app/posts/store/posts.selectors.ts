import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPosts from './posts.reducer';

export const selectPosts = createFeatureSelector<fromPosts.PostsState>(fromPosts.postsFeatureKey);

export const selectApiEndpointUrl = createSelector(
  selectPosts,
  (state: fromPosts.PostsState) => state.apiUrls
);

export const selectPostsItems = createSelector(
  selectPosts,
  (state: fromPosts.PostsState) => state.posts,
);

export const selectPostItem = createSelector(
  selectPosts,
  (state: fromPosts.PostsState) => state.post,
);

export const selectCommentsItems = createSelector(
  selectPosts,
  (state: fromPosts.PostsState) => state.comments,
);
