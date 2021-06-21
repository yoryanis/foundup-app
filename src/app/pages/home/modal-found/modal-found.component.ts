import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  AuthService,
  GlobalService,
  NotificationService,
} from 'src/app/services';
import { ModalMapComponent } from 'src/app/components/modal-map/modal-map.component';

@Component({
  selector: 'app-modal-found',
  templateUrl: './modal-found.component.html',
  styleUrls: ['./modal-found.component.scss'],
})
export class ModalFoundComponent implements OnInit {
  public notiForm!: FormGroup;
  public userInfo: any;
  public loading = false;
  public latitude: number = 0;
  public longitude: number = 0;
  public isCoordinates: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public accessoryData: any,
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly notificationService: NotificationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalFoundComponent>
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
  }

  get f() {
    return this.notiForm.controls;
  }

  public addLocation() {
    this.dialog
      .open(ModalMapComponent, {
        width: '550px',
        height: '550px',
        disableClose: false,
        data: '',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.latitude = result.lat;
          this.longitude = result.lng;

          this.isCoordinates = true;
        } else {
          this.isCoordinates = false;
        }
      });
  }

  public onClose(state: boolean): void {
    this.dialogRef.close(state);
  }

  public onSubmit() {
    if (this.notiForm.invalid) {
      return;
    }

    if (this.latitude === 0 && this.longitude === 0) {
      this.globalService.onFailure(
        'La ubicación es obligatoria para reportar',
        0
      );
    } else {
      this.loading = true;
      const data = {
        details: this.notiForm.get('details')!.value,
        type: 'found',
        user_id: this.userInfo.id,
        user_owner: this.accessoryData.comments[0].userOwner.id,
        latitude: this.latitude,
        longitude: this.longitude,
      };

      this.notificationService.create(this.accessoryData.id, data).subscribe(
        (res) => {
          this.globalService.onSuccess(res.message, res.code);
          this.loading = false;
          this.onClose(true);
        },
        (err) => {
          this.globalService.onFailure(err.error.error, err.error.code);
          this.loading = false;
        }
      );
    }
  }

  private createForm() {
    this.notiForm = this.formBuilder.group({
      details: ['', [Validators.required]],
    });
  }
}
