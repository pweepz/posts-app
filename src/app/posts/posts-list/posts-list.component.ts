import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { getApiEndpoints, getComments, getPosts } from '../store/posts.actions';
import { selectApiEndpointUrl, selectCommentsItems, selectPostsItems } from '../store/posts.selectors';
import { ApiUrlResponse, Post, Comment } from '../store/models';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  posts: Post[];
  comments: Comment[];
  filterTerm = '';

  private destroy$: Subject<any> = new Subject();

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.store.dispatch(getApiEndpoints());
    this.store.pipe(
      select(selectApiEndpointUrl),
      filter(urls => !!(urls && urls.posts && urls.posts.length)),
      takeUntil(this.destroy$)
    ).subscribe((apiUrls: ApiUrlResponse) => {
      this.store.dispatch(getPosts({ url: apiUrls.posts }));
      this.store.dispatch(getComments({ url: apiUrls.comments }));
    });

    this.store.pipe(
      select(selectPostsItems),
      takeUntil(this.destroy$)
    ).subscribe((posts: Post[]) => this.posts = posts);

    this.store.pipe(
      select(selectCommentsItems),
      takeUntil(this.destroy$)
    ).subscribe((comments: Comment[]) => this.comments = comments);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPostComments(postId: number) {
    return this.comments.filter((item: Comment) => item.postId === postId);
  }

  get postItems() {
    return this.posts.filter(item => item.title.toLowerCase().includes(this.filterTerm.toLowerCase()));
  }
}
