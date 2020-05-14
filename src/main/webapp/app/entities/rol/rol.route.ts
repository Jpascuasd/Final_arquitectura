import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRol, Rol } from 'app/shared/model/rol.model';
import { RolService } from './rol.service';
import { RolComponent } from './rol.component';
import { RolDetailComponent } from './rol-detail.component';
import { RolUpdateComponent } from './rol-update.component';

@Injectable({ providedIn: 'root' })
export class RolResolve implements Resolve<IRol> {
  constructor(private service: RolService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRol> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rol: HttpResponse<Rol>) => {
          if (rol.body) {
            return of(rol.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Rol());
  }
}

export const rolRoute: Routes = [
  {
    path: '',
    component: RolComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.rol.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RolDetailComponent,
    resolve: {
      rol: RolResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.rol.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RolUpdateComponent,
    resolve: {
      rol: RolResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.rol.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RolUpdateComponent,
    resolve: {
      rol: RolResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.rol.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
