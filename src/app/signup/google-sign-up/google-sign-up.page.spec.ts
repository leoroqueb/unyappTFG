import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleSignUpPage } from './google-sign-up.page';

describe('GoogleSignUpPage', () => {
  let component: GoogleSignUpPage;
  let fixture: ComponentFixture<GoogleSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
