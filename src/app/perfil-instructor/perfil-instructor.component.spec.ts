import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInstructorComponent } from './perfil-instructor.component';

describe('PerfilInstructorComponent', () => {
  let component: PerfilInstructorComponent;
  let fixture: ComponentFixture<PerfilInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilInstructorComponent]
    });
    fixture = TestBed.createComponent(PerfilInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
