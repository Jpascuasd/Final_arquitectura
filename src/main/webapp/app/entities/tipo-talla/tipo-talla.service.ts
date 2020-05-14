import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoTalla } from 'app/shared/model/tipo-talla.model';

type EntityResponseType = HttpResponse<ITipoTalla>;
type EntityArrayResponseType = HttpResponse<ITipoTalla[]>;

@Injectable({ providedIn: 'root' })
export class TipoTallaService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-tallas';

  constructor(protected http: HttpClient) {}

  create(tipoTalla: ITipoTalla): Observable<EntityResponseType> {
    return this.http.post<ITipoTalla>(this.resourceUrl, tipoTalla, { observe: 'response' });
  }

  update(tipoTalla: ITipoTalla): Observable<EntityResponseType> {
    return this.http.put<ITipoTalla>(this.resourceUrl, tipoTalla, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoTalla>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoTalla[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
