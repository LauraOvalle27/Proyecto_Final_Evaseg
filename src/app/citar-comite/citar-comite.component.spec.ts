import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitarComiteComponent } from './citar-comite.component';

describe('CitarComiteComponent', () => {
  let component: CitarComiteComponent;
  let fixture: ComponentFixture<CitarComiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitarComiteComponent]
    });
    fixture = TestBed.createComponent(CitarComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
