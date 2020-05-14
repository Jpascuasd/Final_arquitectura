import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAbono, Abono } from 'app/shared/model/abono.model';
import { AbonoService } from './abono.service';
import { AbonoComponent } from './abono.component';
import { AbonoDetailComponent } from './abono-detail.component';
import { AbonoUpdateComponent } from './abono-update.component';

@Injectable({ providedIn: 'root' })
export class AbonoResolve implements Resolve<IAbono> {
  constructor(private service: AbonoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAbono> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((abono: HttpResponse<Abono>) => {
          if (abono.body) {
            return of(abono.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Abono());
  }
}

export const abonoRoute: Routes = [
  {
    path: '',
    component: AbonoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.abono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AbonoDetailComponent,
    resolve: {
      abono: AbonoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.abono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AbonoUpdateComponent,
    resolve: {
      abono: AbonoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.abono.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AbonoUpdateComponent,
    resolve: {
      abono: AbonoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.abono.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
