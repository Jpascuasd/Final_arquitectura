import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAbono, Abono } from 'app/shared/model/abono.model';
import { AbonoService } from './abono.service';

@Component({
  selector: 'jhi-abono-update',
  templateUrl: './abono-update.component.html'
})
export class AbonoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    usuario: [],
    fecha: [],
    codigo: [],
    cantidadValor: []
  });

  constructor(protected abonoService: AbonoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ abono }) => {
      if (!abono.id) {
        const today = moment().startOf('day');
        abono.fecha = today;
      }

      this.updateForm(abono);
    });
  }

  updateForm(abono: IAbono): void {
    this.editForm.patchValue({
      id: abono.id,
      usuario: abono.usuario,
      fecha: abono.fecha ? abono.fecha.format(DATE_TIME_FORMAT) : null,
      codigo: abono.codigo,
      cantidadValor: abono.cantidadValor
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const abono = this.createFromForm();
    if (abono.id !== undefined) {
      this.subscribeToSaveResponse(this.abonoService.update(abono));
    } else {
      this.subscribeToSaveResponse(this.abonoService.create(abono));
    }
  }

  private createFromForm(): IAbono {
    return {
      ...new Abono(),
      id: this.editForm.get(['id'])!.value,
      usuario: this.editForm.get(['usuario'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      codigo: this.editForm.get(['codigo'])!.value,
      cantidadValor: this.editForm.get(['cantidadValor'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbono>>): void {
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
