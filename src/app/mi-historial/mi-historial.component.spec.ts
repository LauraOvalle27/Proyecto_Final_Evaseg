import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHistorialComponent } from './MiHistorialComponent';

describe('MiHistorialComponent', () => {
  let component: MiHistorialComponent;
  let fixture: ComponentFixture<MiHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiHistorialComponent]
    });
    fixture = TestBed.createComponent(MiHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
