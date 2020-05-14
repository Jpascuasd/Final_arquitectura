import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProvedor } from 'app/shared/model/provedor.model';

type EntityResponseType = HttpResponse<IProvedor>;
type EntityArrayResponseType = HttpResponse<IProvedor[]>;

@Injectable({ providedIn: 'root' })
export class ProvedorService {
  public resourceUrl = SERVER_API_URL + 'api/provedors';

  constructor(protected http: HttpClient) {}

  create(provedor: IProvedor): Observable<EntityResponseType> {
    return this.http.post<IProvedor>(this.resourceUrl, provedor, { observe: 'response' });
  }

  update(provedor: IProvedor): Observable<EntityResponseType> {
    return this.http.put<IProvedor>(this.resourceUrl, provedor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProvedor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProvedor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
