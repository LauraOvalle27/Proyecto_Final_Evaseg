import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaCoordinacionComponent } from './bandeja-coordinacion.component';

describe('BandejaCoordinacionComponent', () => {
  let component: BandejaCoordinacionComponent;
  let fixture: ComponentFixture<BandejaCoordinacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandejaCoordinacionComponent]
    });
    fixture = TestBed.createComponent(BandejaCoordinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
