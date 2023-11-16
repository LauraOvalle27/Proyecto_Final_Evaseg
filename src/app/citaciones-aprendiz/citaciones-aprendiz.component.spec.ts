import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitacionesAprendizComponent } from './citaciones-aprendiz.component';

describe('CitacionesAprendizComponent', () => {
  let component: CitacionesAprendizComponent;
  let fixture: ComponentFixture<CitacionesAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitacionesAprendizComponent]
    });
    fixture = TestBed.createComponent(CitacionesAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
