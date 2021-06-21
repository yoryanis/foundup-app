import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  AuthService,
  GlobalService,
  UserService,
} from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private currentImage: any;
  public activeLinkIndex = -1;
  public editBtn: boolean = false;
  public navLinks!: any[];
  public user!: any;
  public userInfo: any;
  private images = [
    { src: '../../../assets/img/portada1.jpg' },
    { src: '../../../assets/img/portada2.png' },
    { src: '../../../assets/img/portada3.jpg' },
    { src: '../../../assets/img/portada4.jpg' },
    { src: '../../../assets/img/portada5.jpg' },
    { src: '../../../assets/img/portada6.jpg' },
    { src: '../../../assets/img/portada7.jpg' },
    { src: '../../../assets/img/portada8.jpg' },
    { src: '../../../assets/img/portada9.jpg' },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly globalService: GlobalService,
    private readonly userService: UserService,
    private route: Router,
    private router: ActivatedRoute
  ) {
   
    router.params.subscribe((_) => {
      this.editBtn = true;
      this.getUser(this.router.snapshot.params.id);
      this.userService.sendParamId(this.router.snapshot.params.id);
    });
    this.currentImage = this.updateRandomImage();

    this.navLinks = [
      {
        label: `Reportes`,
        id: this.userService.sendParamId(this.router.snapshot.params.id),
        link: './reports',
        index: 0,
      },
      {
        label: `Sin reporte`,
        id: this.userService.sendParamId(this.router.snapshot.params.id),
        link: './no-reports',
        index: 1,
      },
    ];

  }

  ngOnInit() {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);

    if (+this.userInfo.identification === +this.router.snapshot.params.id) {
      this.editBtn = true;
    } else {
      this.editBtn = false;
    }
    this.getUser(this.router.snapshot.params.id);

    setInterval(() => {
      this.currentImage = this.updateRandomImage();
    }, 60000);
  }

  public getImage() {
    return this.currentImage.src;
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

  private updateRandomImage() {
    const r = Math.floor(Math.random() * (this.images.length - 1)) + 0;
    return this.images[r];
  }
}
