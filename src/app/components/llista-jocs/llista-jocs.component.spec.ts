import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LlistaJocs } from './llista-jocs.component';

describe('LlistaJocs', () => {
  let component: LlistaJocs;
  let fixture: ComponentFixture<LlistaJocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlistaJocs],
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaJocs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
