import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytripsMainComponent } from './mytrips-main.component';

describe('MytripsMainComponent', () => {
  let component: MytripsMainComponent;
  let fixture: ComponentFixture<MytripsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytripsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytripsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
