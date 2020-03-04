import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { PostsEffects } from './store/posts.effects';
import * as fromPostsReducer from './store/posts.reducer';



@NgModule({
  declarations: [PostsListComponent, PostDetailComponent, PostCommentsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatCardModule,
    MatIconModule,
    StoreModule.forFeature(fromPostsReducer.postsFeatureKey, fromPostsReducer.reducer),
    EffectsModule.forFeature([PostsEffects]),
    MatExpansionModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class PostsModule { }
