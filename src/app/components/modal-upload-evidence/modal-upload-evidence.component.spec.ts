import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadEvidenceComponent } from './modal-upload-evidence.component';

describe('ModalUploadEvidenceComponent', () => {
  let component: ModalUploadEvidenceComponent;
  let fixture: ComponentFixture<ModalUploadEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUploadEvidenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUploadEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
