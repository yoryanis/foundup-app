import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteAccessoryComponent } from './modal-delete-accessory.component';

describe('ModalDeleteAccessoryComponent', () => {
  let component: ModalDeleteAccessoryComponent;
  let fixture: ComponentFixture<ModalDeleteAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteAccessoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
