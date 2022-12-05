import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { QPostService } from '../q-post.service';
import { RouterTestingModule } from '@angular/router/testing'; 

import { ViewPostDetailsComponent } from './view-post-details.component';
import { By, BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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

  getPost = () => of({
    userId: 1,
    id: 1,
    title: "cooking recipe",
    body: "test 1"
  })

  getCommentsByPostId = () => of([{
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "comment 1"
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "comment 2"
  }])
}

const expectedDetailsInfo = {
  name: "Leanne Graham",
  title: "cooking recipe",
  content: "test 1",
  comments: [
  {
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    content: "comment 1"
  },
  {
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    content: "comment 2"
  }]
}

describe('ViewPostDetailsComponent', () => {
  let component: ViewPostDetailsComponent;
  let fixture: ComponentFixture<ViewPostDetailsComponent>;
  let qPostService: QPostService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ViewPostDetailsComponent,
        { provide: QPostService, useClass: MockQPostService }
      ],
      imports: [RouterTestingModule, CommonModule, BrowserModule],
    })
    component = TestBed.inject(ViewPostDetailsComponent);
    qPostService = TestBed.inject(QPostService);
    fixture = TestBed.createComponent(ViewPostDetailsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate detail page with post created by users and comments', () => {
    component.ngOnInit();
    expect(component.postDetailsInfo).toEqual(expectedDetailsInfo)
  });

  // it('should call redirection button', fakeAsync(() => {    
  //   fixture.detectChanges();
  //   const backToPostsButton = fixture.debugElement.query(
  //     By.css('[data-testid="back-to-posts-button"]')
  //   );
  //   backToPostsButton.triggerEventHandler('click', null);
  //   tick();
  //   expect(component.backToPosts).toHaveBeenCalled();
  // }));

});
