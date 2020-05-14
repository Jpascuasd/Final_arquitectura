import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProvedor, Provedor } from 'app/shared/model/provedor.model';
import { ProvedorService } from './provedor.service';

@Component({
  selector: 'jhi-provedor-update',
  templateUrl: './provedor-update.component.html'
})
export class ProvedorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codigo: []
  });

  constructor(protected provedorService: ProvedorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ provedor }) => {
      this.updateForm(provedor);
    });
  }

  updateForm(provedor: IProvedor): void {
    this.editForm.patchValue({
      id: provedor.id,
      codigo: provedor.codigo
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const provedor = this.createFromForm();
    if (provedor.id !== undefined) {
      this.subscribeToSaveResponse(this.provedorService.update(provedor));
    } else {
      this.subscribeToSaveResponse(this.provedorService.create(provedor));
    }
  }

  private createFromForm(): IProvedor {
    return {
      ...new Provedor(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProvedor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
