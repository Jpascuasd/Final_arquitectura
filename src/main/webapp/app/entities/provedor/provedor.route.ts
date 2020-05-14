import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProvedor, Provedor } from 'app/shared/model/provedor.model';
import { ProvedorService } from './provedor.service';
import { ProvedorComponent } from './provedor.component';
import { ProvedorDetailComponent } from './provedor-detail.component';
import { ProvedorUpdateComponent } from './provedor-update.component';

@Injectable({ providedIn: 'root' })
export class ProvedorResolve implements Resolve<IProvedor> {
  constructor(private service: ProvedorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProvedor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((provedor: HttpResponse<Provedor>) => {
          if (provedor.body) {
            return of(provedor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Provedor());
  }
}

export const provedorRoute: Routes = [
  {
    path: '',
    component: ProvedorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.provedor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProvedorDetailComponent,
    resolve: {
      provedor: ProvedorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.provedor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProvedorUpdateComponent,
    resolve: {
      provedor: ProvedorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.provedor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProvedorUpdateComponent,
    resolve: {
      provedor: ProvedorResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.provedor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
