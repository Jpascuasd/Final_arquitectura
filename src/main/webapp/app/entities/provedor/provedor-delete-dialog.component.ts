import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvedor } from 'app/shared/model/provedor.model';
import { ProvedorService } from './provedor.service';

@Component({
  templateUrl: './provedor-delete-dialog.component.html'
})
export class ProvedorDeleteDialogComponent {
  provedor?: IProvedor;

  constructor(protected provedorService: ProvedorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.provedorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('provedorListModification');
      this.activeModal.close();
    });
  }
}
