import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAprendizComponent } from './inicio-aprendiz.component';

describe('InicioAprendizComponent', () => {
  let component: InicioAprendizComponent;
  let fixture: ComponentFixture<InicioAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioAprendizComponent]
    });
    fixture = TestBed.createComponent(InicioAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
