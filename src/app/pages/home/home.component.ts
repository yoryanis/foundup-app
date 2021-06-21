import * as moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay, first } from 'rxjs/operators';

import {
  AccessoryService,
  AuthService,
  GlobalService,
  NotificationService,
} from 'src/app/services';
import { Accesssory } from 'src/app/entities/accessory.class';
import { ModalFoundComponent } from './modal-found/modal-found.component';
import { ModalMapComponent } from 'src/app/components/modal-map/modal-map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public currentElements: number = 100;
  public endDate: any;
  public page: number = 1;
  public reports: any[] = [];
  public startDate: any;
  public filter = '';
  public searchFailed!: boolean;
  public notify!: any;
  public userInfo: any;
  public btnAccept: boolean = false;
  public count: number = 0;
  public comments: any[] = [];
  public photos: any[] = [];

  constructor(
    private readonly accessoryService: AccessoryService,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly notiService: NotificationService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.blockUI.start('Cargando...');
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.endDate = this.getFormattedTomorrow();
    this.startDate = this.getFormattedLastYears();

    this.getAccesories(
      this.page,
      this.currentElements,
      this.startDate,
      this.endDate
    );
  }

  public goToProfile(id: number) {
    this.router.navigateByUrl(`/profile/${id}`);
  }

  public sendAlert(report: Accesssory) {
    this.dialog
      .open(ModalFoundComponent, {
        width: '550px',
        height: '380px',
        disableClose: false,
        data: report,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.getCountSeen(this.userInfo.identification);
          this.getAccesories(
            this.page,
            this.currentElements,
            this.startDate,
            this.endDate
          );
        }
      });
  }

  public search($event: any) {
    this.endDate = this.getFormattedTomorrow();
    this.startDate = this.getFormattedLastYears();

    this.accessoryService
      .search(
        this.page,
        this.currentElements,
        this.startDate,
        this.endDate,
        $event
      )
      .pipe(first())
      .subscribe((res) => {
        this.blockUI.start('Buscando coincidencias...');
        this.reports = res.data.records.filter(
          (x: any) => x.images?.length > 0
        );

        this.blockUI.stop();
      });
  }

  public onLocation(report: Accesssory) {
    this.dialog
      .open(ModalMapComponent, {
        width: '550px',
        height: '550px',
        disableClose: false,
        data: report,
      })
      .afterClosed()
      .subscribe((result) => {});
  }

  private getAccesories(
    page: number,
    currentElements: number,
    startDate: string,
    endDate: string
  ) {
    this.accessoryService
      .getAll(page, currentElements, startDate, endDate)
      .subscribe((res) => {
        this.reports = res.data.records.filter(
          (x: any) => x.images?.length > 0
        );

        this.blockUI.stop();
      });
  }

  private getFormattedLastYears(): string {
    const instant = moment(new Date()).add(-12, 'M');
    return instant.format('YYYY-MM-DD');
  }

  private getFormattedTomorrow(): string {
    const instant = moment(new Date()).add(1, 'd');
    return instant.format('YYYY-MM-DD');
  }

  private getCountSeen(id: number) {
    this.notiService.getAllCount(id).subscribe((res) => {
      this.count = res.data;
    });
  }
}
