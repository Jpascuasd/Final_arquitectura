import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITalla, Talla } from 'app/shared/model/talla.model';
import { TallaService } from './talla.service';
import { TallaComponent } from './talla.component';
import { TallaDetailComponent } from './talla-detail.component';
import { TallaUpdateComponent } from './talla-update.component';

@Injectable({ providedIn: 'root' })
export class TallaResolve implements Resolve<ITalla> {
  constructor(private service: TallaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITalla> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((talla: HttpResponse<Talla>) => {
          if (talla.body) {
            return of(talla.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Talla());
  }
}

export const tallaRoute: Routes = [
  {
    path: '',
    component: TallaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.talla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TallaDetailComponent,
    resolve: {
      talla: TallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.talla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TallaUpdateComponent,
    resolve: {
      talla: TallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.talla.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TallaUpdateComponent,
    resolve: {
      talla: TallaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.talla.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
