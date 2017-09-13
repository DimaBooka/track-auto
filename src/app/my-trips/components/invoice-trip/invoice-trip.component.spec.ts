import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTripComponent } from './invoice-trip.component';

describe('InvoiceTripComponent', () => {
  let component: InvoiceTripComponent;
  let fixture: ComponentFixture<InvoiceTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
