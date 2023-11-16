import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadosCoordinacionComponent } from './llamados-coordinacion.component';

describe('LlamadosCoordinacionComponent', () => {
  let component: LlamadosCoordinacionComponent;
  let fixture: ComponentFixture<LlamadosCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadosCoordinacionComponent]
    });
    fixture = TestBed.createComponent(LlamadosCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
