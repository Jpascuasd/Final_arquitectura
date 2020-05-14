import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILista } from 'app/shared/model/lista.model';

type EntityResponseType = HttpResponse<ILista>;
type EntityArrayResponseType = HttpResponse<ILista[]>;

@Injectable({ providedIn: 'root' })
export class ListaService {
  public resourceUrl = SERVER_API_URL + 'api/listas';

  constructor(protected http: HttpClient) {}

  create(lista: ILista): Observable<EntityResponseType> {
    return this.http.post<ILista>(this.resourceUrl, lista, { observe: 'response' });
  }

  update(lista: ILista): Observable<EntityResponseType> {
    return this.http.put<ILista>(this.resourceUrl, lista, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILista>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILista[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
