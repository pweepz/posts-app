import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromPosts from './posts.actions';
import { PostsService } from './posts.service';
import { Post, Comment, ApiUrlResponse } from './models';

@Injectable()
export class PostsEffects {

  getApiEndpoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getApiEndpoints),
      mergeMap(() =>
        this.postsService.getApiEndpoints().pipe(
          map((apiUrls: ApiUrlResponse) => fromPosts.setApiEndpoints({ apiUrls })),
          catchError((error: any) => of(fromPosts.requestFailed({ error }))),
        ),
      ),
    ),
  );

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getPosts),
      mergeMap(({ url }) =>
        this.postsService.getItemsByType(url).pipe(
          map((posts: Post[]) => fromPosts.setPosts({ posts })),
          catchError((error: any) => of(fromPosts.requestFailed({ error }))),
        ),
      ),
    ),
  );

  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getComments),
      mergeMap(({ url }) =>
        this.postsService.getItemsByType(url).pipe(
          map((comments: Comment[]) => fromPosts.setComments({ comments })),
          catchError((error: any) => of(fromPosts.requestFailed({ error }))),
        ),
      ),
    ),
  );

  getPosts = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPosts.getPost),
      mergeMap(({ url, id }) =>
        this.postsService.getItemsByType(`${url}/${id}`).pipe(
          map((post: Post) => fromPosts.setPost({ post })),
          catchError((error: any) => of(fromPosts.requestFailed({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) {}
}
