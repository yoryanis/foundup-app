import { Accesssory } from '../entities/accessory.class';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Api } from '../shared/api';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AccessoryService {
  constructor(private readonly globalService: GlobalService) {}

  public getAll(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string
  ): Observable<any> {
    return this.globalService
      .get(Api.Endpoints.ACCESSORY.ALL(pageNumber, pageElements, start, end))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllReports(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string,
    state: string,
    identification: number
  ): Observable<any> {
    return this.globalService
      .get(
        Api.Endpoints.ACCESSORY.ALL_REPORTS(
          pageNumber,
          pageElements,
          start,
          end,
          state,
          identification
        )
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public search(
    pageNumber: number,
    pageElements: number,
    start: string,
    end: string,
    filter: any
  ): Observable<any> {
    return this.globalService
      .get(
        Api.Endpoints.ACCESSORY.SEARCH(
          pageNumber,
          pageElements,
          start,
          end,
          filter
        )
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public getAllcategories(): Observable<any> {
    return this.globalService.get(Api.Endpoints.CATEGORY.BASE).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getById(id: string) {
    return this.globalService.get(Api.Endpoints.ACCESSORY.BASE + '/' + id).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public create(id: number, accessory: Accesssory) {
    return this.globalService
      .post(Api.Endpoints.ACCESSORY.BASE + `/${id}`, accessory)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public update(id: string, accessory: Accesssory) {
    return this.globalService
      .put(Api.Endpoints.ACCESSORY.UPDATE(id), accessory)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public delete(accessory: string) {
    return this.globalService
      .delete(Api.Endpoints.ACCESSORY.BASE + '/' + accessory)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public uploadEvidence(id_unique: string, data: FormData) {
    const headers = new HttpHeaders({});

    return this.globalService
      .post(Api.Endpoints.ACCESSORY.UPLOAD(id_unique), data, {
        headers,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public deleteEvidence(id: number) {
    return this.globalService
      .delete(Api.Endpoints.ACCESSORY.REMOVE_EVIDENCE(id))
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
