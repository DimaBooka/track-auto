import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStopsComponent } from './detail-stops.component';

describe('DetailStopsComponent', () => {
  let component: DetailStopsComponent;
  let fixture: ComponentFixture<DetailStopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
