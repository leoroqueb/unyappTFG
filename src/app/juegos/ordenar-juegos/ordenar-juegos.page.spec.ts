import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdenarJuegosPage } from './ordenar-juegos.page';

describe('OrdenarJuegosPage', () => {
  let component: OrdenarJuegosPage;
  let fixture: ComponentFixture<OrdenarJuegosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenarJuegosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenarJuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
