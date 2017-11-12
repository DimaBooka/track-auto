import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInteractionComponent } from './location-interaction.component';

describe('LocationInteractionComponent', () => {
  let component: LocationInteractionComponent;
  let fixture: ComponentFixture<LocationInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
