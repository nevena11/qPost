import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QPostService } from '../q-post.service';

import { PostComponent } from './post.component';

class MockQPostService {
  getUsers = () => of([{
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Bret",
    email: "Sincere@april.biz"
  }])

  getPosts = () => of([{
    userId: 1,
    id: 1,
    title: "cooking recipe",
    body: "test 1"
  },
  {
    userId: 2,
    id: 2,
    title: "traveling",
    body: "test 2"
  }])
}
describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let qPostService: QPostService
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PostComponent,
        { provide: QPostService, useClass: MockQPostService }
      ]    
    })
    .compileComponents();

    component = TestBed.inject(PostComponent);
    qPostService = TestBed.inject(QPostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
