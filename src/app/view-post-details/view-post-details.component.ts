import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QPostService } from '../q-post.service';
import { Router } from '@angular/router'
import { forkJoin } from 'rxjs';
import { IComment, IPostDetailsInfo, IUser } from '../types';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent {
  postId!: number
  postDetailsInfo!: IPostDetailsInfo

  constructor(
    private route: ActivatedRoute,
    private qPostService: QPostService,
    private router: Router
    ) {
    this.route.params.subscribe( params => this.postId = params['id'])
  }

  ngOnInit() {
    forkJoin({
      usersData: this.qPostService.getUsers(),
      postData: this.qPostService.getPost(this.postId),
      commentsData: this.qPostService.getCommentsByPostId(this.postId)
      })
      .subscribe(res => {
        const {usersData, postData, commentsData} = res
        this.postDetailsInfo = {
          name: usersData.find((user: IUser) => user.id === res.postData.userId)?.name,
          title: postData.title,
          content: postData.body,
          comments: commentsData.map((comment: IComment) => ({
            name: comment.name,
            email: comment.email,
            content: comment.body
          }))
        }
      })
  }
  backToPosts() {
    return this.router.navigate(['/posts'])  
  }
}
