import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductoDetalle, ProductoDetalle } from 'app/shared/model/producto-detalle.model';
import { ProductoDetalleService } from './producto-detalle.service';
import { ProductoDetalleComponent } from './producto-detalle.component';
import { ProductoDetalleDetailComponent } from './producto-detalle-detail.component';
import { ProductoDetalleUpdateComponent } from './producto-detalle-update.component';

@Injectable({ providedIn: 'root' })
export class ProductoDetalleResolve implements Resolve<IProductoDetalle> {
  constructor(private service: ProductoDetalleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductoDetalle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productoDetalle: HttpResponse<ProductoDetalle>) => {
          if (productoDetalle.body) {
            return of(productoDetalle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductoDetalle());
  }
}

export const productoDetalleRoute: Routes = [
  {
    path: '',
    component: ProductoDetalleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.productoDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductoDetalleDetailComponent,
    resolve: {
      productoDetalle: ProductoDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.productoDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductoDetalleUpdateComponent,
    resolve: {
      productoDetalle: ProductoDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.productoDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductoDetalleUpdateComponent,
    resolve: {
      productoDetalle: ProductoDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.productoDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
