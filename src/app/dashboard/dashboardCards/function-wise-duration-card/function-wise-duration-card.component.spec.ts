import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionWiseDurationCardComponent } from './function-wise-duration-card.component';

describe('FunctionWiseDurationCardComponent', () => {
  let component: FunctionWiseDurationCardComponent;
  let fixture: ComponentFixture<FunctionWiseDurationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionWiseDurationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionWiseDurationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
