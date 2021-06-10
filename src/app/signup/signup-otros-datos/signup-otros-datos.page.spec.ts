import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupOtrosDatosPage } from './signup-otros-datos.page';

describe('SignupOtrosDatosPage', () => {
  let component: SignupOtrosDatosPage;
  let fixture: ComponentFixture<SignupOtrosDatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupOtrosDatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupOtrosDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
