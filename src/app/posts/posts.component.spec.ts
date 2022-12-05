import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { PostsComponent } from './posts.component';
import { QPostService } from '../q-post.service';

const expectedPosts = [{
  id: 1,
  name: "Leanne Graham",
  title: "cooking recipe",
  content: "test 1"
},
{
  id: 2,
  name: "Ervin Howell",
  title: "traveling",
  content: "test 2"
}]

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

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let qPostService: QPostService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        { provide: QPostService, useClass: MockQPostService }
      ]
    })
    component = TestBed.inject(PostsComponent);
    qPostService = TestBed.inject(QPostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate posts with posts created by users', () => {
    component.ngOnInit();
    expect(component.posts[0]).toEqual(expectedPosts[0])
    expect(component.posts[1]).toEqual(expectedPosts[1])
    expect((component.posts[1] as any).id).toEqual(expectedPosts[1].id)
  });

  it('should filter posts according to search term', () => {
    // arrange
    const mockEvent = {
      code: 'Enter',
      target: {
        value: 'cooking'
      }
    }
    // act
    component.ngOnInit();
    component.search(mockEvent);
    // assert
    expect(component.posts[0]).toEqual(expectedPosts[0])
  });

  it('should not filter posts according to search term', () => {
    // arrange
    const mockEvent = {
      code: 'Some other',
      target: {
        value: 'cooking'
      }
    }
    // act
    component.ngOnInit();
    component.search(mockEvent);
    // assert
    expect(component.posts[0]).toEqual(expectedPosts[0])
    expect(component.posts[1]).toEqual(expectedPosts[1])
  });
});
