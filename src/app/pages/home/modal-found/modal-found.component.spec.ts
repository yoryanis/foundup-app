import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFoundComponent } from './modal-found.component';

describe('ModalFoundComponent', () => {
  let component: ModalFoundComponent;
  let fixture: ComponentFixture<ModalFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
