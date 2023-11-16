import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallosCoordinacionComponent } from './fallos-coordinacion.component';

describe('FallosCoordinacionComponent', () => {
  let component: FallosCoordinacionComponent;
  let fixture: ComponentFixture<FallosCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FallosCoordinacionComponent]
    });
    fixture = TestBed.createComponent(FallosCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
