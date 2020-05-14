import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvedor } from 'app/shared/model/provedor.model';

@Component({
  selector: 'jhi-provedor-detail',
  templateUrl: './provedor-detail.component.html'
})
export class ProvedorDetailComponent implements OnInit {
  provedor: IProvedor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provedor }) => (this.provedor = provedor));
  }

  previousState(): void {
    window.history.back();
  }
}
