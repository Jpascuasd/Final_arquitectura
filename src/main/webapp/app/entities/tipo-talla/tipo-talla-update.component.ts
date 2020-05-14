import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoTalla, TipoTalla } from 'app/shared/model/tipo-talla.model';
import { TipoTallaService } from './tipo-talla.service';

@Component({
  selector: 'jhi-tipo-talla-update',
  templateUrl: './tipo-talla-update.component.html'
})
export class TipoTallaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(protected tipoTallaService: TipoTallaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoTalla }) => {
      this.updateForm(tipoTalla);
    });
  }

  updateForm(tipoTalla: ITipoTalla): void {
    this.editForm.patchValue({
      id: tipoTalla.id,
      nombre: tipoTalla.nombre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoTalla = this.createFromForm();
    if (tipoTalla.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoTallaService.update(tipoTalla));
    } else {
      this.subscribeToSaveResponse(this.tipoTallaService.create(tipoTalla));
    }
  }

  private createFromForm(): ITipoTalla {
    return {
      ...new TipoTalla(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoTalla>>): void {
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
