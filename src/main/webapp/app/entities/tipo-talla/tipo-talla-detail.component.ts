import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoTalla } from 'app/shared/model/tipo-talla.model';

@Component({
  selector: 'jhi-tipo-talla-detail',
  templateUrl: './tipo-talla-detail.component.html'
})
export class TipoTallaDetailComponent implements OnInit {
  tipoTalla: ITipoTalla | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoTalla }) => (this.tipoTalla = tipoTalla));
  }

  previousState(): void {
    window.history.back();
  }
}
