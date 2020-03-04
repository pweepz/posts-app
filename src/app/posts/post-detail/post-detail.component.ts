import { Component, OnDestroy, OnInit } from '@angular/core';
import { getApiEndpoints, getComments, getPost } from '../store/posts.actions';
import { select, Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { ApiUrlResponse, Comment, Post } from '../store/models';
import { selectApiEndpointUrl, selectCommentsItems, selectPostItem } from '../store/posts.selectors';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  comments: Comment[];

  private destroy$: Subject<any> = new Subject();

  constructor(private store: Store<PostsState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(getApiEndpoints());
    this.store.pipe(
      select(selectPostItem),
      takeUntil(this.destroy$)
    ).subscribe((post: Post) => this.post = post);
    this.store.pipe(
      select(selectCommentsItems),
      takeUntil(this.destroy$)
    ).subscribe((comments: Comment[]) => this.comments = comments);

    this.activatedRoute.params.subscribe((params: Params) => {
      if ('id' in params) {
        this.store.pipe(
          select(selectApiEndpointUrl),
          filter(urls => !!(urls && urls.posts && urls.posts.length)),
          takeUntil(this.destroy$)
        ).subscribe((apiUrls: ApiUrlResponse) => {
          this.store.dispatch(getPost({ url: apiUrls.posts, id: params.id }));
          this.store.dispatch(getComments({ url: apiUrls.comments }));
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get postComments() {
    return this.post && this.comments.filter((item: Comment) => item.postId === this.post.id) || '';
  }

}
