import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITalla, Talla } from 'app/shared/model/talla.model';
import { TallaService } from './talla.service';

@Component({
  selector: 'jhi-talla-update',
  templateUrl: './talla-update.component.html'
})
export class TallaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(protected tallaService: TallaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talla }) => {
      this.updateForm(talla);
    });
  }

  updateForm(talla: ITalla): void {
    this.editForm.patchValue({
      id: talla.id,
      nombre: talla.nombre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const talla = this.createFromForm();
    if (talla.id !== undefined) {
      this.subscribeToSaveResponse(this.tallaService.update(talla));
    } else {
      this.subscribeToSaveResponse(this.tallaService.create(talla));
    }
  }

  private createFromForm(): ITalla {
    return {
      ...new Talla(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalla>>): void {
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
