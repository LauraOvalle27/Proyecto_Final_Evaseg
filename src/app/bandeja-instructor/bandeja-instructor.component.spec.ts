import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaInstructorComponent } from './bandeja-instructor.component';

describe('BandejaInstructorComponent', () => {
  let component: BandejaInstructorComponent;
  let fixture: ComponentFixture<BandejaInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaInstructorComponent]
    });
    fixture = TestBed.createComponent(BandejaInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
