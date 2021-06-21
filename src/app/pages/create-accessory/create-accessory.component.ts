import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay, first } from 'rxjs/operators';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

import { AccessoryService, AuthService, GlobalService } from '../../services';
import { CITY } from 'src/app/entities/enum';
import { DATE_FORMAT } from '../../utils/moment-format.util';
import { ModalMapComponent } from 'src/app/components/modal-map/modal-map.component';

@Component({
  selector: 'app-create-accessory',
  templateUrl: './create-accessory.component.html',
  styleUrls: ['./create-accessory.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class CreateAccessoryComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public accessoryForm!: FormGroup;
  public categories: any[] = [];
  public loading = false;
  public maxDate!: string;
  public places = CITY;
  public reportLoading: boolean = false;
  public userInfo: any;
  public latitude: number = 0;
  public longitude: number = 0;
  public isCoordinates: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly accessoryService: AccessoryService,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.blockUI.start('Cargando...');
    this.createForm();
  }

  ngOnInit(): void {
    this.maxDate = this.getFormattedYear();
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
    this.getCategories();
  }

  get f() {
    return this.accessoryForm.controls;
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

  public onChange($event: any) {
    if ($event.checked) {
      this.reportLoading = true;
    } else {
      this.reportLoading = false;
      this.clearValidation();
    }
  }

  public onSubmit() {
    if (this.accessoryForm.get('isReport')!.value) {
      this.addValidation();
      if (this.accessoryForm.invalid) {
        return;
      }

      if (this.latitude === 0 && this.longitude === 0) {
        this.globalService.onFailure(
          'La ubicación es obligatoria para reportar',
          0
        );
      } else {
        this.loading = true;
        this.accessoryService
          .create(+this.userInfo.id, {
            name: this.accessoryForm.get('name')?.value,
            category_id: this.accessoryForm.get('category')?.value,
            description: this.accessoryForm.get('description')?.value,
            state: 'lost',
            lost_date: this.accessoryForm.get('lost_date')?.value,
            lost_place: this.accessoryForm.get('lost_place')?.value,
            latitude: this.latitude,
            longitude: this.longitude,
            reward: this.accessoryForm.get('reward')?.value,
          })
          .pipe(first())
          .pipe(delay(1500))
          .subscribe(
            (res) => {
              if (res.code > 1000) {
                this.globalService.onSuccess(res.message, res.code);
                this.route.navigateByUrl(
                  `/profile/${this.userInfo.identification}/reports`
                );
              } else {
                this.globalService.onFailure(res.error, res.code);
              }
              this.loading = false;
            },
            (err) => {
              this.globalService.onFailure(err.error.error, err.error.code);
              this.loading = false;
            }
          );
      }
    } else {
      this.clearValidation();
      if (this.accessoryForm.invalid) {
        return;
      }

      this.loading = true;
      this.accessoryService
        .create(+this.userInfo.id, {
          name: this.accessoryForm.get('name')?.value,
          category_id: this.accessoryForm.get('category')?.value,
          state: 'created',
        })
        .pipe(first())
        .pipe(delay(1500))
        .subscribe(
          (res) => {
            if (res.code > 1000) {
              this.globalService.onSuccess(res.message, res.code);
              this.route.navigateByUrl(
                `/profile/${this.userInfo.identification}/no-reports`
              );
            } else {
              this.globalService.onFailure(res.error, res.code);
            }
          },
          (err) => {
            this.globalService.onFailure(err.error.error, err.error.code);
            this.loading = false;
          }
        );
    }
  }

  private addValidation() {
    this.f['description'].setValidators(Validators.required);
    this.f['lost_date'].setValidators(Validators.required);
    this.f['lost_place'].setValidators(Validators.required);
    this.f['description'].updateValueAndValidity();
    this.f['lost_date'].updateValueAndValidity();
    this.f['lost_place'].updateValueAndValidity();
  }

  private clearValidation() {
    this.f['description'].setValidators(null);
    this.f['lost_date'].setValidators(null);
    this.f['lost_place'].setValidators(null);
    this.f['description'].updateValueAndValidity();
    this.f['lost_date'].updateValueAndValidity();
    this.f['lost_place'].updateValueAndValidity();
  }

  private createForm() {
    this.accessoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lost_date: ['', [Validators.required]],
      lost_place: ['', [Validators.required]],
      reward: [null],
      isReport: [false],
    });
  }

  private getCategories() {
    this.accessoryService.getAllcategories().subscribe((res) => {
      this.categories = res.data;
      this.blockUI.stop();
    });
  }

  private getFormattedYear(): string {
    const instant = moment(new Date()).add(-0, 'd');
    return instant.format('YYYY-MM-DD');
  }
}
