import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaJoc } from './targeta-joc.component';
import { JocTaula } from '../../models/joc-taula.model';

describe('TargetaJoc', () => {
  let component: TargetaJoc;
  let fixture: ComponentFixture<TargetaJoc>;

  const jocProva: JocTaula = {
    id: 1,
    titol: 'Catan',
    descripcio: 'Joc d’estratègia basat en la gestió de recursos.',
    categoria: 'Estratègia',
    dataPublicacio: '1995-01-01',
    duradaMinuts: 90,
    destacat: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaJoc],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaJoc);
    component = fixture.componentInstance;
    component.joc = jocProva;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('hauria de crear la targeta del joc', () => {
    expect(component).toBeTruthy();
  });
});
