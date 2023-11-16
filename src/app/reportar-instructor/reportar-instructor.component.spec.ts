import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarInstructorComponent } from './reportar-instructor.component';

describe('ReportarInstructorComponent', () => {
  let component: ReportarInstructorComponent;
  let fixture: ComponentFixture<ReportarInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportarInstructorComponent]
    });
    fixture = TestBed.createComponent(ReportarInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
