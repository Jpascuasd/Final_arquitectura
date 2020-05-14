import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoDetalle } from 'app/shared/model/producto-detalle.model';
import { ProductoDetalleService } from './producto-detalle.service';
import { ProductoDetalleDeleteDialogComponent } from './producto-detalle-delete-dialog.component';

@Component({
  selector: 'jhi-producto-detalle',
  templateUrl: './producto-detalle.component.html'
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {
  productoDetalles?: IProductoDetalle[];
  eventSubscriber?: Subscription;

  constructor(
    protected productoDetalleService: ProductoDetalleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productoDetalleService.query().subscribe((res: HttpResponse<IProductoDetalle[]>) => (this.productoDetalles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductoDetalles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductoDetalle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductoDetalles(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoDetalleListModification', () => this.loadAll());
  }

  delete(productoDetalle: IProductoDetalle): void {
    const modalRef = this.modalService.open(ProductoDetalleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productoDetalle = productoDetalle;
  }
}
