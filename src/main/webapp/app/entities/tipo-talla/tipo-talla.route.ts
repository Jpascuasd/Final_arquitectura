import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoTalla, TipoTalla } from 'app/shared/model/tipo-talla.model';
import { TipoTallaService } from './tipo-talla.service';
import { TipoTallaComponent } from './tipo-talla.component';
import { TipoTallaDetailComponent } from './tipo-talla-detail.component';
import { TipoTallaUpdateComponent } from './tipo-talla-update.component';

@Injectable({ providedIn: 'root' })
export class TipoTallaResolve implements Resolve<ITipoTalla> {
  constructor(private service: TipoTallaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoTalla> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoTalla: HttpResponse<TipoTalla>) => {
          if (tipoTalla.body) {
            return of(tipoTalla.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoTalla());
  }
}

export const tipoTallaRoute: Routes = [
  {
    path: '',
    component: TipoTallaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.tipoTalla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoTallaDetailComponent,
    resolve: {
      tipoTalla: TipoTallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.tipoTalla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoTallaUpdateComponent,
    resolve: {
      tipoTalla: TipoTallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.tipoTalla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoTallaUpdateComponent,
    resolve: {
      tipoTalla: TipoTallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.tipoTalla.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
