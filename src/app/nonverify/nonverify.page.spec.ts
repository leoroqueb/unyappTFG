import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NonverifyPage } from './nonverify.page';

describe('NonverifyPage', () => {
  let component: NonverifyPage;
  let fixture: ComponentFixture<NonverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonverifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NonverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
