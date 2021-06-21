import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

import { AccessoryService, GlobalService } from 'src/app/services';

@Component({
  selector: 'app-modal-upload-evidence',
  templateUrl: './modal-upload-evidence.component.html',
  styleUrls: ['./modal-upload-evidence.component.scss'],
})
export class ModalUploadEvidenceComponent implements OnInit {
  public uploadForm!: FormGroup;
  public loadingPhoto = false;
  public preview?: string;
  public files: any = [];
  public formats: string[] = ['image/png', 'image/gif', 'image/jpeg'];
  public noAllowed?: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public id_unique: string,
    private formBuilder: FormBuilder,
    private readonly accessoryService: AccessoryService,
    private readonly globalService: GlobalService,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ModalUploadEvidenceComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  public clearImage(): any {
    this.preview = '';
    this.files = [];
  }

  public onClose(): void {
    this.dialogRef.close(true);
  }

  public onSubmit() {
    if (this.files.length === 0 || this.noAllowed) {
      return;
    }

    this.loadingPhoto = true;

    const formData: any = new FormData();
    this.files.forEach((file: any) => {
      formData.append('file', file);
    });

    this.accessoryService.uploadEvidence(this.id_unique, formData).subscribe(
      (res) => {
        if (res.code > 1000) {
          this.globalService.onSuccess(res.message, res.code);
          this.loadingPhoto = false;
          this.clearImage();
          this.onClose();
        } else {
          this.globalService.onFailure(res.error, res.code);
          this.loadingPhoto = false;
          this.clearImage();
        }
      },
      (err) => {
        this.globalService.onFailure(err.error.error, err.error.code);
        this.loadingPhoto = false;
      }
    );
  }

  private createForm() {
    this.uploadForm = this.formBuilder.group({
      file: ['', [Validators.required]],
    });
  }

  public previewImage(event: any): any {
    const fileCatcher = event.target.files[0];
    const size = 1572864;

    if (
      this.formats.find((x) => x === fileCatcher.type) &&
      fileCatcher.size <= size
    ) {
      this.noAllowed = false;
      this.extraerBase64(fileCatcher).then((imagen: any) => {
        this.preview = imagen.base;
      });
      this.files.push(fileCatcher);
    } else {
      this.clearImage();
      this.noAllowed = true;
    }
  }

  private extraerBase64 = async ($event: any) =>
    new Promise((resolve: any) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
      return;
    });
}
