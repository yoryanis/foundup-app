import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, GlobalService, UserService } from 'src/app/services';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public image: boolean = true;
  public userInfo: any;
  public user!: any;

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private route: Router,
    public readonly userService: UserService
  ) {}

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    this.getUser(this.userInfo.identification);
  }

  public goToProfile() {
    this.route.navigateByUrl(`/profile/${this.userInfo.identification}`);
  }

  private getUser(user: number) {
    this.userService.getById(user).subscribe(
      (res) => {
        if (res.code > 1000) {
          this.user = res.data;
        } else {
          this.globalService.onFailure(res.error, res.code);
          this.route.navigateByUrl('/not-found');
        }
      },
      (err: any) => {
        this.route.navigateByUrl('/not-found');
        this.globalService.onFailure(err.error.error, err.error.code);
      }
    );
  }
}
