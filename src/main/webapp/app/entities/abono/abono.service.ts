import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAbono } from 'app/shared/model/abono.model';

type EntityResponseType = HttpResponse<IAbono>;
type EntityArrayResponseType = HttpResponse<IAbono[]>;

@Injectable({ providedIn: 'root' })
export class AbonoService {
  public resourceUrl = SERVER_API_URL + 'api/abonos';

  constructor(protected http: HttpClient) {}

  create(abono: IAbono): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(abono);
    return this.http
      .post<IAbono>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(abono: IAbono): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(abono);
    return this.http
      .put<IAbono>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAbono>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbono[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(abono: IAbono): IAbono {
    const copy: IAbono = Object.assign({}, abono, {
      fecha: abono.fecha && abono.fecha.isValid() ? abono.fecha.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((abono: IAbono) => {
        abono.fecha = abono.fecha ? moment(abono.fecha) : undefined;
      });
    }
    return res;
  }
}
