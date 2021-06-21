import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoReportsComponent } from './no-reports.component';

describe('NoReportsComponent', () => {
  let component: NoReportsComponent;
  let fixture: ComponentFixture<NoReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
