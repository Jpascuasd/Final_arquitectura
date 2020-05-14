import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';

@Component({
  templateUrl: './movimiento-delete-dialog.component.html'
})
export class MovimientoDeleteDialogComponent {
  movimiento?: IMovimiento;

  constructor(
    protected movimientoService: MovimientoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('movimientoListModification');
      this.activeModal.close();
    });
  }
}
