import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITalla } from 'app/shared/model/talla.model';

type EntityResponseType = HttpResponse<ITalla>;
type EntityArrayResponseType = HttpResponse<ITalla[]>;

@Injectable({ providedIn: 'root' })
export class TallaService {
  public resourceUrl = SERVER_API_URL + 'api/tallas';

  constructor(protected http: HttpClient) {}

  create(talla: ITalla): Observable<EntityResponseType> {
    return this.http.post<ITalla>(this.resourceUrl, talla, { observe: 'response' });
  }

  update(talla: ITalla): Observable<EntityResponseType> {
    return this.http.put<ITalla>(this.resourceUrl, talla, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITalla>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITalla[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
