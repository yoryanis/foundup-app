import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AccessoryService, GlobalService } from 'src/app/services';

@Component({
  selector: 'app-modal-delete-accessory',
  templateUrl: './modal-delete-accessory.component.html',
  styleUrls: ['./modal-delete-accessory.component.scss'],
})
export class ModalDeleteAccessoryComponent implements OnInit {
  public info!: any;
  public loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public accessoryData: string,
    private readonly accessoryService: AccessoryService,
    private readonly globalService: GlobalService,
    public dialogRef: MatDialogRef<ModalDeleteAccessoryComponent>
  ) {}

  ngOnInit(): void {
    this.getById(this.accessoryData);
  }

  public onClose(state: boolean): void {
    this.dialogRef.close(state);
  }

  public onDelete() {
    this.loading = true;
    this.accessoryService.delete(this.accessoryData).subscribe(
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

  private getById(id_unique: string) {
    this.accessoryService.getById(id_unique).subscribe((res) => {
      this.info = res.data;
    });
  }
}
