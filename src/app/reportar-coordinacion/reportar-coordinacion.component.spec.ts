import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarCoordinacionComponent } from './reportar-coordinacion.component';

describe('ReportarCoordinacionComponent', () => {
  let component: ReportarCoordinacionComponent;
  let fixture: ComponentFixture<ReportarCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarCoordinacionComponent]
    });
    fixture = TestBed.createComponent(ReportarCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
