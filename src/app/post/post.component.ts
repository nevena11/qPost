import { Component, Input } from '@angular/core';
import { Router } from "@angular/router"
import { IPosts } from '../types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent {
  @Input() postInfo!: IPosts;
  constructor(private router: Router) { }

  viewDetails(id: number) {
    return this.router.navigate(['/post', id])
  }
}
