import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILista, Lista } from 'app/shared/model/lista.model';
import { ListaService } from './lista.service';
import { ListaComponent } from './lista.component';
import { ListaDetailComponent } from './lista-detail.component';
import { ListaUpdateComponent } from './lista-update.component';

@Injectable({ providedIn: 'root' })
export class ListaResolve implements Resolve<ILista> {
  constructor(private service: ListaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILista> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((lista: HttpResponse<Lista>) => {
          if (lista.body) {
            return of(lista.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lista());
  }
}

export const listaRoute: Routes = [
  {
    path: '',
    component: ListaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.lista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListaDetailComponent,
    resolve: {
      lista: ListaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.lista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListaUpdateComponent,
    resolve: {
      lista: ListaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.lista.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListaUpdateComponent,
    resolve: {
      lista: ListaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'fleastoreApp.lista.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
