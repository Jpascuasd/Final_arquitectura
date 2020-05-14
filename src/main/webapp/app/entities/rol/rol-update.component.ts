import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRol, Rol } from 'app/shared/model/rol.model';
import { RolService } from './rol.service';

@Component({
  selector: 'jhi-rol-update',
  templateUrl: './rol-update.component.html'
})
export class RolUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(protected rolService: RolService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rol }) => {
      this.updateForm(rol);
    });
  }

  updateForm(rol: IRol): void {
    this.editForm.patchValue({
      id: rol.id,
      nombre: rol.nombre
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rol = this.createFromForm();
    if (rol.id !== undefined) {
      this.subscribeToSaveResponse(this.rolService.update(rol));
    } else {
      this.subscribeToSaveResponse(this.rolService.create(rol));
    }
  }

  private createFromForm(): IRol {
    return {
      ...new Rol(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRol>>): void {
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
