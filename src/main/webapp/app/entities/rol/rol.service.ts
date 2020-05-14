import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRol } from 'app/shared/model/rol.model';

type EntityResponseType = HttpResponse<IRol>;
type EntityArrayResponseType = HttpResponse<IRol[]>;

@Injectable({ providedIn: 'root' })
export class RolService {
  public resourceUrl = SERVER_API_URL + 'api/rols';

  constructor(protected http: HttpClient) {}

  create(rol: IRol): Observable<EntityResponseType> {
    return this.http.post<IRol>(this.resourceUrl, rol, { observe: 'response' });
  }

  update(rol: IRol): Observable<EntityResponseType> {
    return this.http.put<IRol>(this.resourceUrl, rol, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRol>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRol[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
