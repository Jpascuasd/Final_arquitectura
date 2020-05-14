import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { MovimientoDeleteDialogComponent } from './movimiento-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento',
  templateUrl: './movimiento.component.html'
})
export class MovimientoComponent implements OnInit, OnDestroy {
  movimientos?: IMovimiento[];
  eventSubscriber?: Subscription;

  constructor(protected movimientoService: MovimientoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.movimientoService.query().subscribe((res: HttpResponse<IMovimiento[]>) => (this.movimientos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMovimientos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMovimiento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMovimientos(): void {
    this.eventSubscriber = this.eventManager.subscribe('movimientoListModification', () => this.loadAll());
  }

  delete(movimiento: IMovimiento): void {
    const modalRef = this.modalService.open(MovimientoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimiento = movimiento;
  }
}
