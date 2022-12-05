import { Component } from '@angular/core';
import { QPostService } from '../q-post.service';
import { IPost, IPosts, IUser } from '../types';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  posts: IPosts[] = []
  postsOriginal: IPosts[] = []

  constructor(private qPostService: QPostService){}

  ngOnInit() {
    forkJoin({
      usersData: this.qPostService.getUsers(),
      postsData: this.qPostService.getPosts()
      })
      .subscribe(res => {
      const { postsData, usersData } = res
      this.posts = postsData.map((post: IPost) => ({
        id: post.id,
        name: usersData.find((user: IUser) => user.id === post.userId)?.name,
        title: post.title,
        content: post.body
      }))
      this.postsOriginal = [...this.posts]
    })
  }

  search(event: any) {
    if(event.code === 'Enter') {
      this.onButtonSearch(event.target.value)
    }
  }

  onButtonSearch(searchValue: any) {
    this.posts = searchValue ? this.postsOriginal
    .filter((post: IPosts) => 
      post.title.includes(searchValue)) : [...this.postsOriginal]
  }
}
