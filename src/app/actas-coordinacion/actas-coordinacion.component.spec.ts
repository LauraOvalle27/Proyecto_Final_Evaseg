import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasCoordinacionComponent } from './actas-coordinacion.component';

describe('ActasCoordinacionComponent', () => {
  let component: ActasCoordinacionComponent;
  let fixture: ComponentFixture<ActasCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActasCoordinacionComponent]
    });
    fixture = TestBed.createComponent(ActasCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
