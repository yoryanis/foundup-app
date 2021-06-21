import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  AccessoryService,
  AuthService,
  GlobalService,
  UserService,
} from 'src/app/services';
import { ModalDeleteAccessoryComponent } from '../modal-delete-accessory/modal-delete-accessory.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-no-reports',
  templateUrl: './no-reports.component.html',
  styleUrls: ['./no-reports.component.scss'],
})
export class NoReportsComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public currentElements: number = 100;
  public endDate: any;
  public paramId!: any;
  public page: number = 1;
  public reports: any[] = [];
  public startDate: any;
  public userInfo: any;

  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly globalService: GlobalService,
    private route: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.blockUI.start('Cargando...');
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.endDate = this.getFormattedTomorrow();
    this.startDate = this.getFormattedLastYears();

    this.paramId = +this.userService.getParamId();
    if (+this.userInfo.identification === this.paramId) {
      this.getAccesories(
        this.page,
        this.currentElements,
        this.startDate,
        this.endDate,
        'created',
        +this.userInfo.identification
      );
    } else {
      this.blockUI.stop();
      this.route.navigateByUrl(`/profile/${this.paramId}/reports`);
    }
  }

  public edit(id_unique: string) {
    this.route.navigateByUrl(`/edit/element/${id_unique}`);
  }

  public goToProfile() {}

  public openDialogDelete(id_unique: string) {
    this.dialog
      .open(ModalDeleteAccessoryComponent, {
        width: '400px',
        height: '230px',
        disableClose: true,
        data: id_unique,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result)
          this.getAccesories(
            this.page,
            this.currentElements,
            this.startDate,
            this.endDate,
            'created',
            +this.userInfo.identification
          );
      });
  }

  private getAccesories(
    page: number,
    currentElements: number,
    startDate: string,
    endDate: string,
    state: string,
    identification: number
  ) {
    this.accessoryService
      .getAllReports(
        page,
        currentElements,
        startDate,
        endDate,
        state,
        identification
      )
      .subscribe(
        (res) => {
          this.reports = res.data.records;
          this.blockUI.stop();
        },
        (_) => this.blockUI.stop()
      );
  }

  private getFormattedLastYears(): string {
    const instant = moment(new Date()).add(-12, 'M');
    return instant.format('YYYY-MM-DD');
  }

  private getFormattedTomorrow(): string {
    const instant = moment(new Date()).add(1, 'd');
    return instant.format('YYYY-MM-DD');
  }
}
