import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly globalService: GlobalService) {}

  public create(id: number, notification: any) {
    return this.globalService
      .post(Api.Endpoints.NOTIFICATION.GENERATE(id), notification)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAll(id: number): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.NOTIFICATION.BASE + '/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllComments(id: string): Observable<any> {
    return this.globalService.get(Api.Endpoints.NOTIFICATION.COMMENTS(id)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllCount(id: number): Observable<any> {
    return this.globalService.get(Api.Endpoints.NOTIFICATION.COUNT(id)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public updateSeen(id: number) {
    return this.globalService.put(Api.Endpoints.NOTIFICATION.SEEN(id)).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public updateAccept(id_unique: string) {
    return this.globalService
      .put(Api.Endpoints.NOTIFICATION.ACCEPT(id_unique))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
