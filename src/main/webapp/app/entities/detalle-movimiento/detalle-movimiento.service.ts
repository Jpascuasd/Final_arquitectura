import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

type EntityResponseType = HttpResponse<IDetalleMovimiento>;
type EntityArrayResponseType = HttpResponse<IDetalleMovimiento[]>;

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-movimientos';

  constructor(protected http: HttpClient) {}

  create(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleMovimiento);
    return this.http
      .post<IDetalleMovimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(detalleMovimiento: IDetalleMovimiento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleMovimiento);
    return this.http
      .put<IDetalleMovimiento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDetalleMovimiento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDetalleMovimiento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(detalleMovimiento: IDetalleMovimiento): IDetalleMovimiento {
    const copy: IDetalleMovimiento = Object.assign({}, detalleMovimiento, {
      fecha: detalleMovimiento.fecha && detalleMovimiento.fecha.isValid() ? detalleMovimiento.fecha.toJSON() : undefined
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
      res.body.forEach((detalleMovimiento: IDetalleMovimiento) => {
        detalleMovimiento.fecha = detalleMovimiento.fecha ? moment(detalleMovimiento.fecha) : undefined;
      });
    }
    return res;
  }
}
