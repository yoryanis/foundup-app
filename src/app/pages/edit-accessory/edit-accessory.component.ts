import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { delay, first } from 'rxjs/operators';

import { AccessoryService, AuthService, GlobalService } from '../../services';
import { CITY } from 'src/app/entities/enum';
import { ModalMapComponent } from 'src/app/components/modal-map/modal-map.component';

@Component({
  selector: 'app-edit-accessory',
  templateUrl: './edit-accessory.component.html',
  styleUrls: ['./edit-accessory.component.scss'],
})
export class EditAccessoryComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public accessoryForm!: FormGroup;
  public categories: any[] = [];
  public editBtn: boolean = false;
  public loading = false;
  public maxDate!: string;
  public places = CITY;
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
    public dialog: MatDialog,
    private router: ActivatedRoute
  ) {
    this.blockUI.start('Cargando...');
    this.createForm();
  }

  ngOnInit(): void {
    this.maxDate = this.getFormattedYear();
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.getCategories();
    this.getAccessory(this.router.snapshot.params.id_unique);
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

  public onSubmit() {
    if (this.accessoryForm.invalid) {
      return;
    }

    if (
      (this.latitude === 0 || this.latitude === null) &&
      (this.longitude === 0 || this.longitude === null)
    ) {
      this.globalService.onFailure(
        'La ubicación es obligatoria para reportar',
        0
      );
    } else {
      this.loading = true;
      this.accessoryService
        .update(this.router.snapshot.params.id_unique, {
          name: this.accessoryForm.get('name')?.value,
          category: +this.accessoryForm.get('category')?.value,
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
  }

  private createForm() {
    this.accessoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      lost_date: ['', [Validators.required]],
      lost_place: ['', [Validators.required]],
      reward: [null],
    });
  }

  private getCategories() {
    this.accessoryService.getAllcategories().subscribe((res) => {
      this.categories = res.data;
      this.blockUI.stop();
    });
  }

  private getAccessory(id_unique: string) {
    this.accessoryService.getById(id_unique).subscribe((res) => {
      if (res.data === undefined) {
        this.route.navigateByUrl('/not-found');
      } else {
        this.patchValue(res.data);
      }
      this.blockUI.stop();
    });
  }

  private getFormattedYear(): string {
    const instant = moment(new Date()).add(-0, 'd');
    return instant.format('YYYY-MM-DD');
  }

  private patchValue(data: any) {
    this.latitude = data?.latitude;
    this.longitude = data?.longitude;

    if (this.latitude > 0 || this.longitude > 0) {
      this.isCoordinates = true;
    } else {
      this.isCoordinates = false;
    }
    this.accessoryForm.patchValue({
      name: data?.name,
      category: data?.category.id,
      description: data?.description,
      lost_date: data?.lost_date,
      lost_place: data?.lost_place,
      reward: data?.reward,
    });
  }
}
