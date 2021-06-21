import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import {
  NotificationService,
  AuthService,
  GlobalService,
} from 'src/app/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public notifications: any[] = [];
  public userInfo: any;
  public count: number = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly notiService: NotificationService
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.getCountSeen(this.userInfo.identification);
    this.getNotifications(this.userInfo.identification);
  }

  public accept(id_unique: string) {
    this.notiService.updateAccept(id_unique).subscribe(() => {
      this.getNotifications(this.userInfo.identification);
    });
  }

  public seen(id: number) {
    this.notiService.updateSeen(id).subscribe(() => {
      this.getNotifications(this.userInfo.identification);
      this.getCountSeen(this.userInfo.identification);
    });
  }

  private getNotifications(id: number) {
    this.notiService.getAll(id).subscribe((res) => {
      this.notifications = res.data;
    });
  }

  private getCountSeen(id: number) {
    this.notiService.getAllCount(id).subscribe((res) => {
      this.count = res.data;
    });
  }
}
