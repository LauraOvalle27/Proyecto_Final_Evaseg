import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinacionInicioComponent } from './coordinacion-inicio.component';

describe('CoordinacionInicioComponent', () => {
  let component: CoordinacionInicioComponent;
  let fixture: ComponentFixture<CoordinacionInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinacionInicioComponent]
    });
    fixture = TestBed.createComponent(CoordinacionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
