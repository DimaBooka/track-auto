import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStopComponent } from './detail-stop.component';

describe('DetailStopComponent', () => {
  let component: DetailStopComponent;
  let fixture: ComponentFixture<DetailStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
