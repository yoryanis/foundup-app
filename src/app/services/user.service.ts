import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from './global.service';
import { User } from '../entities/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public paramID!: number;
  private sendParamIdSubject = new Subject<number>();
  public sendParamIdObservable = this.sendParamIdSubject.asObservable();

  constructor(private readonly globalService: GlobalService) {}

  public sendParamId(id: number) {
    this.paramID = id;
    this.sendParamIdSubject.next(id);
  }

  public getParamId() {
    return this.paramID;
  }

  public getById(identification: number) {
    return this.globalService
      .get(Api.Endpoints.USER.BASE + '/' + identification)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public update(user: any, identification: number) {
    return this.globalService
      .put(Api.Endpoints.USER.UPDATE(identification), user)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public updatePassword(password: any, identification: number) {
    return this.globalService
      .put(Api.Endpoints.USER.UPDATEPASSWORD(identification), password)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteAccount(user: User) {
    return this.globalService
      .delete(Api.Endpoints.USER.BASE + `/${user.id}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public create(user: User) {
    return this.globalService.post(Api.Endpoints.USER.BASE, user).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public uploadPhoto(identification: number, data: FormData) {
    const headers = new HttpHeaders({});

    return this.globalService
      .post(Api.Endpoints.USER.AVATAR(identification), data, { headers })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
