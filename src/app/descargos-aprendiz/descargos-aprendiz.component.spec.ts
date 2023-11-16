import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargosAprendizComponent } from './descargos-aprendiz.component';

describe('DescargosAprendizComponent', () => {
  let component: DescargosAprendizComponent;
  let fixture: ComponentFixture<DescargosAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescargosAprendizComponent]
    });
    fixture = TestBed.createComponent(DescargosAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
