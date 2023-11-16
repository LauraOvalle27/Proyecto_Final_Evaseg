import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCoordinacionComponent } from './perfil-coordinacion.component';

describe('PerfilCoordinacionComponent', () => {
  let component: PerfilCoordinacionComponent;
  let fixture: ComponentFixture<PerfilCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilCoordinacionComponent]
    });
    fixture = TestBed.createComponent(PerfilCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
