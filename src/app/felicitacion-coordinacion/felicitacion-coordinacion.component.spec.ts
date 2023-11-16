import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicitacionCoordinacionComponent } from './felicitacion-coordinacion.component';

describe('FelicitacionCoordinacionComponent', () => {
  let component: FelicitacionCoordinacionComponent;
  let fixture: ComponentFixture<FelicitacionCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FelicitacionCoordinacionComponent]
    });
    fixture = TestBed.createComponent(FelicitacionCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
