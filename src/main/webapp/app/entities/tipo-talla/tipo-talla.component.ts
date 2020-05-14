import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoTalla } from 'app/shared/model/tipo-talla.model';
import { TipoTallaService } from './tipo-talla.service';
import { TipoTallaDeleteDialogComponent } from './tipo-talla-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-talla',
  templateUrl: './tipo-talla.component.html'
})
export class TipoTallaComponent implements OnInit, OnDestroy {
  tipoTallas?: ITipoTalla[];
  eventSubscriber?: Subscription;

  constructor(protected tipoTallaService: TipoTallaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tipoTallaService.query().subscribe((res: HttpResponse<ITipoTalla[]>) => (this.tipoTallas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoTallas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoTalla): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoTallas(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoTallaListModification', () => this.loadAll());
  }

  delete(tipoTalla: ITipoTalla): void {
    const modalRef = this.modalService.open(TipoTallaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoTalla = tipoTalla;
  }
}
