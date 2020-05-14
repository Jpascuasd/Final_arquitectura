import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleFactura } from 'app/shared/model/detalle-factura.model';
import { DetalleFacturaService } from './detalle-factura.service';

@Component({
  templateUrl: './detalle-factura-delete-dialog.component.html'
})
export class DetalleFacturaDeleteDialogComponent {
  detalleFactura?: IDetalleFactura;

  constructor(
    protected detalleFacturaService: DetalleFacturaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detalleFacturaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('detalleFacturaListModification');
      this.activeModal.close();
    });
  }
}
