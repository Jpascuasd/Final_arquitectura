import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDetalleFactura, DetalleFactura } from 'app/shared/model/detalle-factura.model';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaComponent } from './detalle-factura.component';
import { DetalleFacturaDetailComponent } from './detalle-factura-detail.component';
import { DetalleFacturaUpdateComponent } from './detalle-factura-update.component';

@Injectable({ providedIn: 'root' })
export class DetalleFacturaResolve implements Resolve<IDetalleFactura> {
  constructor(private service: DetalleFacturaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDetalleFactura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((detalleFactura: HttpResponse<DetalleFactura>) => {
          if (detalleFactura.body) {
            return of(detalleFactura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DetalleFactura());
  }
}

export const detalleFacturaRoute: Routes = [
  {
    path: '',
    component: DetalleFacturaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.detalleFactura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DetalleFacturaDetailComponent,
    resolve: {
      detalleFactura: DetalleFacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.detalleFactura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DetalleFacturaUpdateComponent,
    resolve: {
      detalleFactura: DetalleFacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.detalleFactura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DetalleFacturaUpdateComponent,
    resolve: {
      detalleFactura: DetalleFacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.detalleFactura.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
