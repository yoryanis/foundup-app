import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, first } from 'rxjs/operators';

import { AuthService, GlobalService, UserService } from 'src/app/services';
import { CITY, OCCUPATION } from 'src/app/entities/enum';
import { MustMatch } from '../../utils/match-password.util';
import { User } from 'src/app/entities/user.class';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  public cities = CITY;
  public editBtn: boolean = false;
  public editForm!: FormGroup;
  public hidePwd!: boolean;
  public loading = false;
  public loading2 = false;
  public loading3 = false;
  public loadingPhoto = false;
  public maxDate!: string;
  public occupations = OCCUPATION;
  public passwordForm!: FormGroup;
  public photoForm!: FormGroup;
  public user!: any;
  public userInfo: any;
  public preview?: string;
  public files: any = [];
  public formats: string[] = ['image/png', 'image/gif', 'image/jpeg'];
  public noAllowed?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private route: Router,
    private sanitizer: DomSanitizer,
    public readonly globalService: GlobalService,
    public readonly userService: UserService
  ) {
    this.blockUI.start('Cargando...');
    this.createForm();
  }

  ngOnInit(): void {
    const token: any = this.globalService.getToken();
    this.userInfo = this.authService.getDecodedAccessToken(token);
    this.hidePwd = true;

    this.getUser(this.userInfo.identification);
  }

  public clearImage(): any {
    this.preview = '';
    this.files = [];
  }

  public deleteAccount(user: User) {
    this.loading3 = true;
    Swal.fire({
      title: '¿Está realmente seguro que desea eliminar la cuenta?',
      html: 'Es una operación que no puede ser revertida una vez confirmada.',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteAccount(user).subscribe(
          (res) => {
            this.globalService.onSuccess(res.message, res.code);

            setTimeout(() => {
              this.route.navigateByUrl('/');
            }, 7000);
            this.loading3 = false;
          },
          (err) => {
            this.globalService.onFailure(err.error.error, err.error.code);
            this.loading3 = false;
          }
        );
      } else {
        this.loading3 = false;
      }
    });
  }

  get f() {
    return this.editForm.controls;
  }

  get g() {
    return this.passwordForm.controls;
  }

  public onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    const data = {
      identification: this.editForm.get('identification')?.value,
      name: this.editForm.get('name')?.value,
      lastname: this.editForm.get('lastname')?.value,
      phone: this.editForm.get('phone')?.value,
      occupation: this.editForm.get('occupation')?.value,
      city: this.editForm.get('city')?.value,
      address: this.editForm.get('address')?.value,
      birthdate: this.editForm.get('birthdate')?.value,
      email: this.editForm.get('email')?.value,
    };

    this.loading = true;
    this.userService
      .update(data, this.userInfo.identification)
      .pipe(first())
      .pipe(delay(1500))
      .subscribe(
        (res) => {
          if (res.code > 1000) {
            this.globalService.onSuccess(res.message, res.code);
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

  public onSubmitPassword() {
    if (this.passwordForm.valid) {
      this.loading2 = true;
      this.userService
        .updatePassword(
          { password: this.passwordForm.get('password')?.value },
          this.userInfo.identification
        )
        .subscribe(
          (res) => {
            this.globalService.onSuccess(res.message, res.code);
            this.loading2 = false;
            this.route.navigateByUrl(
              `/profile/${this.userInfo.identification}/reports`
            );
          },
          (err) => {
            this.globalService.onFailure(err.error.error, err.error.code);
            this.loading2 = false;
          }
        );
    }
  }

  public previewImage(event: any): any {
    const fileCatcher = event.target.files[0];
    const size = 1572864;

    if (
      this.formats.find((x) => x === fileCatcher.type) &&
      fileCatcher.size <= size
    ) {
      this.noAllowed = false;
      this.extraerBase64(fileCatcher).then((imagen: any) => {
        this.preview = imagen.base;
      });
      this.files.push(fileCatcher);
    } else {
      this.clearImage();
      this.noAllowed = true;
    }
  }

  public onSubmitPhoto() {
    if (this.files.length === 0 || this.noAllowed) {
      return;
    }

    this.loadingPhoto = true;

    const formData: any = new FormData();
    this.files.forEach((file: any) => {
      formData.append('file', file);
    });

    this.userService
      .uploadPhoto(this.userInfo.identification, formData)
      .subscribe(
        (res) => {
          if (res.code > 1000) {
            this.globalService.onSuccess(res.message, res.code);
            this.loadingPhoto = false;
            this.clearImage();
          } else {
            this.globalService.onFailure(res.error, res.code);
            this.loadingPhoto = false;
            this.clearImage();
          }
        },
        (err) => {
          this.globalService.onFailure(err.error.error, err.error.code);
          this.loadingPhoto = false;
        }
      );
  }

  private createForm() {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: [''],
      occupation: [''],
      city: ['', [Validators.required]],
      address: [''],
      birthdate: ['', [Validators.required]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeat: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        validator: MustMatch('password', 'repeat'),
      }
    );

    this.photoForm = this.formBuilder.group({
      file: ['', [Validators.required]],
    });
  }

  private extraerBase64 = async ($event: any) =>
    new Promise((resolve: any) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
      return;
    });

  private getUser(user: number) {
    this.userService.getById(user).subscribe(
      (res) => {
        if (res.code > 1000) {
          this.user = res.data;
          this.patchValue(res.data);
        } else {
          this.globalService.onFailure(res.error, res.code);
          this.route.navigateByUrl('/not-found');
        }

        this.blockUI.stop();
      },
      (err: any) => {
        this.route.navigateByUrl('/not-found');
        this.globalService.onFailure(err.error.error, err.error.code);
      }
    );
  }

  private patchValue(data: any) {
    this.editForm.patchValue({
      name: data.name,
      lastname: data.lastname,
      occupation: data.occupation,
      city: data.city,
      address: data.address,
      birthdate: data.birthdate,
      phone: data.phone,
      email: data.email,
    });
  }
}
