import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioInstructorComponent } from './inicio-instructor.component';

describe('InicioInstructorComponent', () => {
  let component: InicioInstructorComponent;
  let fixture: ComponentFixture<InicioInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioInstructorComponent]
    });
    fixture = TestBed.createComponent(InicioInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
