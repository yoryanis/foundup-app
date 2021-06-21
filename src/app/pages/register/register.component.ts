import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

import { CITY, OCCUPATION } from 'src/app/entities/enum';
import { DATE_FORMAT } from '../../utils/moment-format.util';
import { GlobalService, UserService } from 'src/app/services';
import { User } from 'src/app/entities/user.class';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  public cities = CITY;
  public loading = false;
  public maxDate: any;
  public occupations = OCCUPATION;
  public registerForm!: FormGroup;
  public hidePwd!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public readonly globalService: GlobalService,
    public readonly userService: UserService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.maxDate = this.getFormattedYear();
    this.hidePwd = true;
  }

  get f() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const data: User = {
      identification: this.registerForm.get('identification')?.value,
      name: this.registerForm.get('name')?.value,
      lastname: this.registerForm.get('lastname')?.value,
      role_id: 2,
      phone: this.registerForm.get('phone')?.value,
      occupation: this.registerForm.get('occupation')?.value,
      city: this.registerForm.get('city')?.value,
      address: this.registerForm.get('address')?.value,
      birthdate: this.registerForm.get('birthdate')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      state: true,
    };

    this.loading = true;
    this.userService
      .create(data)
      .pipe(first())
      .pipe(delay(1500))
      .subscribe(
        (res) => {
          if (res.code > 1000) {
            this.globalService.onSuccess(res.message, res.code);
            this.router.navigateByUrl('/');
          } else {
            this.globalService.onFailure(res.error, res.code);
          }
          this.loading = false;
        },
        (err: any) => {
          this.globalService.onFailure(err.error.error, err.error.code);
          this.loading = false;
        }
      );
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      identification: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
      name: ['', [Validators.required]],
      lastname: [''],
      occupation: [''],
      city: ['', [Validators.required]],
      address: [''],
      birthdate: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      legal: [null, [Validators.requiredTrue]],
    });
  }

  private getFormattedYear(): string {
    const instant = moment(new Date()).add(-16, 'y');
    return instant.format('YYYY-MM-DD');
  }
}
