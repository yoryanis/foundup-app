import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public isLoggedIn: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  public goToHome() {
    this.route.navigateByUrl('/home');
  }

  public goToLogin() {
    this.route.navigateByUrl('/');
  }
}
