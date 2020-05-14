import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovimiento } from 'app/shared/model/movimiento.model';

type EntityResponseType = HttpResponse<IMovimiento>;
type EntityArrayResponseType = HttpResponse<IMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  public resourceUrl = SERVER_API_URL + 'api/movimientos';

  constructor(protected http: HttpClient) {}

  create(movimiento: IMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimiento);
    return this.http
      .post<IMovimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimiento: IMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimiento);
    return this.http
      .put<IMovimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(movimiento: IMovimiento): IMovimiento {
    const copy: IMovimiento = Object.assign({}, movimiento, {
      fecha: movimiento.fecha && movimiento.fecha.isValid() ? movimiento.fecha.toJSON() : undefined
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
      res.body.forEach((movimiento: IMovimiento) => {
        movimiento.fecha = movimiento.fecha ? moment(movimiento.fecha) : undefined;
      });
    }
    return res;
  }
}
