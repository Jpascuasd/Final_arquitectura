import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { DetalleMovimientoDeleteDialogComponent } from './detalle-movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html'
})
export class DetalleMovimientoComponent implements OnInit, OnDestroy {
  detalleMovimientos?: IDetalleMovimiento[];
  eventSubscriber?: Subscription;

  constructor(
    protected detalleMovimientoService: DetalleMovimientoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detalleMovimientoService
      .query()
      .subscribe((res: HttpResponse<IDetalleMovimiento[]>) => (this.detalleMovimientos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetalleMovimientos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDetalleMovimiento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDetalleMovimientos(): void {
    this.eventSubscriber = this.eventManager.subscribe('detalleMovimientoListModification', () => this.loadAll());
  }

  delete(detalleMovimiento: IDetalleMovimiento): void {
    const modalRef = this.modalService.open(DetalleMovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalleMovimiento = detalleMovimiento;
  }
}
