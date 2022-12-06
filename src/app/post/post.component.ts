import { Component, Input } from '@angular/core';
import { Router } from "@angular/router"
import { IPosts } from '../types';
import { QPostService } from '../q-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {
  @Input() postInfo!: IPosts;
  isCommentVisible!: boolean;
  viewOrHideComments = 'View Comments'

  constructor(private router: Router, private qPostService: QPostService) { }

  viewComments(postId: number) {
    this.isCommentVisible = !this.isCommentVisible

    if(!this.isCommentVisible) {
      this.viewOrHideComments = 'View comments'
      this.postInfo.comments = []
      return
    }
    this.qPostService.getCommentsByPostId(postId).subscribe(comments => {
      this.viewOrHideComments = 'Hide comments'
      this.postInfo.comments = comments.map(comment => ({
        name: comment.name,
        content: comment.body,
        email: comment.email
      }))
    })
  }

  viewDetails(id: number) {
    return this.router.navigate(['/post', id])
  }
}
