import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMovimiento, Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoDetailComponent } from './movimiento-detail.component';
import { MovimientoUpdateComponent } from './movimiento-update.component';

@Injectable({ providedIn: 'root' })
export class MovimientoResolve implements Resolve<IMovimiento> {
  constructor(private service: MovimientoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimiento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((movimiento: HttpResponse<Movimiento>) => {
          if (movimiento.body) {
            return of(movimiento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Movimiento());
  }
}

export const movimientoRoute: Routes = [
  {
    path: '',
    component: MovimientoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.movimiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MovimientoDetailComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.movimiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MovimientoUpdateComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.movimiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MovimientoUpdateComponent,
    resolve: {
      movimiento: MovimientoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.movimiento.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
