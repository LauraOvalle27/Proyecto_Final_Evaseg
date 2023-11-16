import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadoAtencionInstructorComponent } from './llamado-atencion-instructor.component';

describe('LlamadoAtencionInstructorComponent', () => {
  let component: LlamadoAtencionInstructorComponent;
  let fixture: ComponentFixture<LlamadoAtencionInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LlamadoAtencionInstructorComponent]
    });
    fixture = TestBed.createComponent(LlamadoAtencionInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
