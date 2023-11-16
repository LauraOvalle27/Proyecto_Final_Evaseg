import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaAprendizComponent } from './bandeja-aprendiz.component';

describe('BandejaAprendizComponent', () => {
  let component: BandejaAprendizComponent;
  let fixture: ComponentFixture<BandejaAprendizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaAprendizComponent]
    });
    fixture = TestBed.createComponent(BandejaAprendizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
