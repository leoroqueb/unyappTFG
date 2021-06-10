import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListChatPage } from './list-chat.page';

describe('ListChatPage', () => {
  let component: ListChatPage;
  let fixture: ComponentFixture<ListChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
