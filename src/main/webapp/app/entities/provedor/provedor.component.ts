import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProvedor } from 'app/shared/model/provedor.model';
import { ProvedorService } from './provedor.service';
import { ProvedorDeleteDialogComponent } from './provedor-delete-dialog.component';

@Component({
  selector: 'jhi-provedor',
  templateUrl: './provedor.component.html'
})
export class ProvedorComponent implements OnInit, OnDestroy {
  provedors?: IProvedor[];
  eventSubscriber?: Subscription;

  constructor(protected provedorService: ProvedorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.provedorService.query().subscribe((res: HttpResponse<IProvedor[]>) => (this.provedors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProvedors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProvedor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProvedors(): void {
    this.eventSubscriber = this.eventManager.subscribe('provedorListModification', () => this.loadAll());
  }

  delete(provedor: IProvedor): void {
    const modalRef = this.modalService.open(ProvedorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.provedor = provedor;
  }
}
