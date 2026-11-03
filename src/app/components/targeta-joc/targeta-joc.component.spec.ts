import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaJoc } from './targeta-joc.component';

describe('TargetaJoc', () => {
  let component: TargetaJoc;
  let fixture: ComponentFixture<TargetaJoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaJoc],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaJoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
