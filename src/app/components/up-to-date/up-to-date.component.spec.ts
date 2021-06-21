import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpToDateComponent } from './up-to-date.component';

describe('UpToDateComponent', () => {
  let component: UpToDateComponent;
  let fixture: ComponentFixture<UpToDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpToDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
