import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefactorPage } from './refactor.page';

describe('RefactorPage', () => {
  let component: RefactorPage;
  let fixture: ComponentFixture<RefactorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefactorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefactorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
