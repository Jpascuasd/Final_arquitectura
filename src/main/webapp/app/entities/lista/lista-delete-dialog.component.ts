import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILista } from 'app/shared/model/lista.model';
import { ListaService } from './lista.service';

@Component({
  templateUrl: './lista-delete-dialog.component.html'
})
export class ListaDeleteDialogComponent {
  lista?: ILista;

  constructor(protected listaService: ListaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.listaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('listaListModification');
      this.activeModal.close();
    });
  }
}
