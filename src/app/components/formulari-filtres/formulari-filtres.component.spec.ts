import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulariFiltres } from './formulari-filtres.component';

describe('FormulariFiltres', () => {
  let component: FormulariFiltres;
  let fixture: ComponentFixture<FormulariFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariFiltres],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulariFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
