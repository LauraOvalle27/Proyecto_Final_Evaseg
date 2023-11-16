import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAprendizComponent } from './perfil-aprendiz.component';

describe('PerfilAprendizComponent', () => {
  let component: PerfilAprendizComponent;
  let fixture: ComponentFixture<PerfilAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilAprendizComponent]
    });
    fixture = TestBed.createComponent(PerfilAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
