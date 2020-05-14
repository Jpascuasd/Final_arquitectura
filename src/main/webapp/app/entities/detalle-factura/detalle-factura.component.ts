import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalleFactura } from 'app/shared/model/detalle-factura.model';
import { DetalleFacturaService } from './detalle-factura.service';
import { DetalleFacturaDeleteDialogComponent } from './detalle-factura-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-factura',
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit, OnDestroy {
  detalleFacturas?: IDetalleFactura[];
  eventSubscriber?: Subscription;

  constructor(
    protected detalleFacturaService: DetalleFacturaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detalleFacturaService.query().subscribe((res: HttpResponse<IDetalleFactura[]>) => (this.detalleFacturas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetalleFacturas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDetalleFactura): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDetalleFacturas(): void {
    this.eventSubscriber = this.eventManager.subscribe('detalleFacturaListModification', () => this.loadAll());
  }

  delete(detalleFactura: IDetalleFactura): void {
    const modalRef = this.modalService.open(DetalleFacturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalleFactura = detalleFactura;
  }
}
