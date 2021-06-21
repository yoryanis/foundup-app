import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService,
  GlobalService,
  NotificationService,
} from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('count') count!: number;
  public userInfo: any;

  constructor(
    private router: Router,
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly notiService: NotificationService
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
    this.getCountSeen(this.userInfo.identification);
  }

  public goToHome() {
    this.router.navigateByUrl('/home');
  }

  public logout() {
    this.authService.logout();
  }

  private getCountSeen(id: number) {
    this.notiService.getAllCount(id).subscribe((res) => {
      this.count = res.data;
    });
  }
}
