import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, GlobalService, UserService } from 'src/app/services';

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss'],
})
export class NavbarMainComponent implements OnInit {
  public userInfo: any;

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
  }

  public goToHome() {
    this.router.navigateByUrl('/home');
  }

  public goToProfile() {
    this.router.navigateByUrl(`/profile/${this.userInfo.identification}`);
  }

  public goToAccesory() {
    this.router.navigateByUrl(`create/element`);
  }
}
